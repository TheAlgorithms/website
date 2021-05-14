/* eslint-disable no-console */
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
let categoryNames: { [category: string]: string } = {};
let languages: { [language: string]: string[] } = {};
let spinner: Ora;

(async () => {
  spinner = ora("Downloading repositories").start();
  if (fs.existsSync("tmp")) await fs.promises.rm("tmp", { recursive: true });
  await fs.promises.mkdir("tmp");
  await fs.promises.mkdir("tmp/repositories");
  process.chdir("tmp/repositories");
  await Promise.all(
    [...Object.keys(Repositories), "algorithms-explanation"].map(
      (repo) =>
        new Promise<void>((resolve, reject) => {
          exec(
            `git clone https://github.com/TheAlgorithms/${repo}.git`,
            (err) => {
              if (err) reject(err);
              else resolve();
            }
          );
        })
    )
  );
  spinner.succeed();
  spinner = ora("Collecting algorithms and rendering code").start();
  for await (const language of Object.keys(Repositories).filter(
    (x) => !!Repositories[x].baseDir
  )) {
    const repo: Repository = Repositories[language];
    languages[language] = [];
    dirLoop: for await (const dir of walk(path.join(language, repo.baseDir))) {
      let valid = false;
      for (const validFilename of repo.allowedFiles) {
        if (dir.endsWith(validFilename)) valid = true;
      }
      if (!valid) continue;
      for (const forbidden of ["test", "__init__"]) {
        if (dir.includes(forbidden)) continue dirLoop;
      }
      if (
        dir.split("/").length -
          path.join(language, repo.baseDir).split("/").length <
        2
      )
        continue; // Ignore top level files
      const name = normalizeTitle(
        dir.split("/").pop().split(".")[0].replace(/_/g, " ")
      );
      const nName = normalize(name);
      const lCategories = dir
        .split("/")
        .slice(
          path.join(language, repo.baseDir).split("/").length,
          dir.split("/").length - 1
        )
        .map(normalizeTitle)
        .map(normalizeCategory);
      if (!algorithms[nName]) {
        algorithms[nName] = {
          slug: normalizeWeak(name),
          name,
          categories: lCategories,
          body: {},
          implementations: {},
          explanationUrl: {},
        };
        for (const category of lCategories) {
          if (!categories[normalize(category)]) {
            categories[normalize(category)] = [];
            categoryNames[normalize(category)] = category;
          }
          categories[normalize(category)].push(normalizeWeak(name));
        }
      }
      algorithms[nName].implementations[language] = {
        dir: path.join(...dir.split("/").slice(1)),
        url: `https://github.com/TheAlgorithms/${language}/tree/master/${path.join(
          ...dir.split("/").slice(1)
        )}`,
        code: highlightCode(
          (await fs.promises.readFile(dir)).toString(),
          language
        ),
      };
      languages[language].push(algorithms[nName].slug);
    }
  }

  // Fetch the C# repo
  process.chdir("c-sharp");
  await (async () => {
    const directory = (await fs.promises.readFile("DIRECTORY.md")).toString();
    let aCategories = [];
    languages["c-sharp"] = [];
    await Promise.all(
      directory.split("\n").map(async (line) => {
        if (line.startsWith("##")) {
          aCategories = [line.substr(2).trim()];
        }
        for (let i = 1; i < 6; i += 1) {
          if (
            line.startsWith(`${"  ".repeat(i)}*`) ||
            line.startsWith(`${"	".repeat(i)}*`)
          ) {
            const match = line
              .substr(2 * i + 1)
              .match(/\[(.+)\]\((.+\/(.+)(?:\..+))\)/);
            aCategories.length = i;
            if (match) {
              const name = match[1];
              const nName = normalizeAlgorithm(name);
              const dir = match[2].replace(
                "https://github.com/TheAlgorithms/C-Sharp/blob/master/",
                ""
              );
              let file: string;
              try {
                file = (await fs.promises.readFile(dir)).toString();
              } catch {
                console.warn(`Failed to get ${dir}`);
                continue;
              }
              if (!algorithms[nName]) {
                algorithms[nName] = {
                  slug: normalizeWeak(name),
                  name,
                  categories: aCategories.filter((x) => !!x),
                  body: {},
                  implementations: {},
                  explanationUrl: {},
                };
                for (const category of aCategories.filter((x) => !!x)) {
                  if (!categories[normalizeCategory(category)])
                    categories[normalizeCategory(category)] = [];
                  categories[normalizeCategory(category)].push(
                    normalizeWeak(name)
                  );
                }
              }
              algorithms[nName].implementations["c-sharp"] = {
                dir,
                url: match[2],
                code: highlightCode(file, "c-sharp"),
              };
              languages["c-sharp"].push(algorithms[nName].slug);
            } else aCategories[i] = line.substr(2 * i + 1).trim();
          }
        }
      })
    );
  })();
  process.chdir("..");
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
              algorithm.explanationUrl[
                locale
              ] = `https://github.com/TheAlgorithms/Algorithms-Explanation/tree/master/${dir}`;
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
      Object.values(algorithms).map((algorithm) => {
        const minAlgorithm = {
          name: algorithm.name,
          slug: algorithm.slug,
          categories: algorithm.categories,
          implementations: {},
        };
        Object.keys(algorithm.implementations).forEach((language) => {
          minAlgorithm.implementations[language] = {
            url: algorithm.implementations[language].url,
          };
        });
        return minAlgorithm;
      })
    )
  );
  const outpCategories = {};
  Object.keys(categories).forEach((key) => {
    outpCategories[categoryNames[key]] = categories[key];
  });
  await fs.promises.writeFile(
    "categories.json",
    JSON.stringify(outpCategories)
  );
  await fs.promises.writeFile("languages.json", JSON.stringify(languages));
  await fs.promises.rm("repositories", { recursive: true });
  spinner.succeed();
})();
