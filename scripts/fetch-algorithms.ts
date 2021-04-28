/* eslint-disable no-param-reassign */
import ora, { Ora } from "ora";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import walk from "../lib/walk";
import { Repositories, Repository } from "../lib/repositories";
import { Algorithm } from "../lib/models";
import {
  normalize,
  normalizeAlgorithm,
  normalizeCategory,
  normalizeTitle,
  normalizeWeak,
} from "../lib/normalize";
import highlightCode from "../lib/highlight";
import locales from "../lib/locales";
import renderMarkdown from "../lib/markdown";
import renderNotebook from "../lib/notebookjs";

let algorithms: { [key: string]: Algorithm } = {};
let categories: { [category: string]: string[] } = {};
let languages: { [language: string]: string[] } = {};
let spinner: Ora;

(async () => {
  spinner = ora("Downloading repositories").start();
  if (fs.existsSync("tmp")) await fs.promises.rmdir("tmp", { recursive: true });
  await fs.promises.mkdir("tmp");
  await fs.promises.mkdir("tmp/repositories");
  process.chdir("tmp/repositories");
  await Promise.all(
    [...Object.keys(Repositories), "algorithms-explanation"].map(
      (repo) =>
        new Promise((resolve) => {
          exec(
            `git clone https://github.com/TheAlgorithms/${repo}.git`,
            resolve
          );
        })
    )
  );
  spinner.succeed();
  spinner = ora("Collecting algorithms and rendering code").start();
  for await (const language of Object.keys(Repositories)) {
    const repo: Repository = Repositories[language];
    dirLoop: for await (const dir of walk(path.join(language, repo.baseDir))) {
      let valid = false;
      for (const validFilename of repo.allowedFiles) {
        if (dir.endsWith(validFilename)) valid = true;
      }
      for (const forbidden of ["test", "__init__"]) {
        if (dir.includes(forbidden)) continue dirLoop;
      }
      if (!valid) continue;
      const name = normalizeTitle(
        dir.split("/").pop().split(".")[0].replace(/_/g, " ")
      );
      const nName = normalize(name);
      const lCategories = dir
        .split("/")
        .slice(1, dir.split("/").length - 1)
        .map(normalizeTitle);
      if (!algorithms[nName]) {
        algorithms[nName] = {
          slug: normalizeWeak(name),
          name,
          categories: lCategories,
          body: {},
          implementations: {},
        };
        for (const category of lCategories) {
          if (!categories[normalizeCategory(category)])
            categories[normalizeCategory(category)] = [];
          categories[normalizeCategory(category)].push(normalizeWeak(name));
        }
      }
      algorithms[nName].implementations[language] = {
        dir: path.join(repo.baseDir, ...dir.split("/").slice(1)),
        url: path.join(
          `https://github.com/TheAlgorithms/${language}/tree/master`,
          repo.baseDir,
          ...dir.split("/").slice(1)
        ),
        code: highlightCode(
          (await fs.promises.readFile(dir)).toString(),
          language
        ),
      };
      if (!languages[language]) languages[language] = [];
      languages[language].push(normalizeWeak(name));
    }
  }
  spinner.succeed();
  spinner = ora("Collecting and rendering explanations").start();
  process.chdir("./algorithms-explanation");
  await Promise.all(
    locales.map(async (locale) => {
      if (fs.existsSync(locale)) {
        for await (const dir of walk(locale)) {
          const match = dir.match(/(?:.+)\/(.+)\.md/);
          if (match) {
            const algorithm = algorithms[normalizeAlgorithm(match[1])];
            if (algorithm) {
              algorithm.body[locale] = await renderMarkdown(
                (await fs.promises.readFile(dir))
                  .toString()
                  .split("\n")
                  .slice(1)
                  .join("\n")
              );
            }
          }
        }
      }
    })
  );
  process.chdir("..");
  await Promise.all(
    Object.values(algorithms).flatMap((algorithm) =>
      Object.keys(algorithm.implementations).flatMap(async (language) => {
        if (language === "jupyter") {
          const render = await renderNotebook(
            (
              await fs.promises.readFile(
                path.join(language, algorithm.implementations[language].dir)
              )
            ).toString()
          );
          locales.forEach((locale) => {
            if (algorithm.body[locale]) algorithm.body[locale] += `\n${render}`;
            else algorithm.body[locale] = render;
          });
        }
      })
    )
  );
  spinner.succeed();
  spinner = ora("Writing algorithms to files").start();
  process.chdir("..");
  await fs.promises.mkdir("algorithms");
  await Promise.all(
    Object.values(algorithms).map(async (algorithm) => {
      await fs.promises.writeFile(
        path.join("algorithms", `${algorithm.slug}.json`),
        JSON.stringify(algorithm, null, 2)
      );
    })
  );
  await fs.promises.writeFile(
    "algorithms.json",
    JSON.stringify(Object.values(algorithms))
  );
  await fs.promises.writeFile(
    "algorithms-min.json",
    JSON.stringify(
      Object.values(algorithms).map((algorithm) => ({
        name: algorithm.name,
        slug: algorithm.slug,
        categories: algorithm.categories,
      }))
    )
  );
  await fs.promises.writeFile("categories.json", JSON.stringify(categories));
  await fs.promises.writeFile("languages.json", JSON.stringify(languages));
  await fs.promises.rmdir("repositories", { recursive: true });
  spinner.succeed();
})();
