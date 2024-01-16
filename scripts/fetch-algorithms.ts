/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import ora, { Ora } from "ora";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { Octokit } from "@octokit/core";
import { throttling } from "@octokit/plugin-throttling";
import dotenv from "dotenv";
import chalk from "chalk";
import AWS from "aws-sdk";
import { walk, asyncWalk } from "../lib/fs";
import { Language, Repositories, Repository } from "../lib/repositories";
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

dotenv.config();
const octokit = new (Octokit.plugin(throttling))({
  ...(process.env.GH_TOKEN ? { auth: process.env.GH_TOKEN } : {}),
  throttle: {
    onRateLimit: (retryAfter, options, _, retryCount) => {
      console.warn(
        `Request quota exhausted for request ${options.method} ${options.url}`
      );

      if (retryCount < 2) {
        console.info(`Retrying after ${retryAfter} seconds!`);
        return true;
      }

      return false;
    },
    onSecondaryRateLimit: (retryAfter, options, _, retryCount) => {
      console.warn(
        `SecondaryRateLimit detected for request ${options.method} ${options.url}`
      );

      if (retryCount < 2) {
        console.info(`Retrying after ${retryAfter} seconds!`);
        return true;
      }

      return false;
    },
  },
});

let algorithms: { [key: string]: Algorithm } = {};
let categories: { [category: string]: string[] } = {};
let categoryNames: { [category: string]: string } = {};
let languages: { [language: string]: string[] } = {};
let authors: {
  [email: string]: {
    name: string;
    login?: string;
    email: string;
    avatar?: string;
    algorithms: Algorithm[];
  };
} = {};
let spinner: Ora;

// Algorithms which are ignored
const algorithmsToIgnore = ["rungradientdescent", "class", "init"];
// Categories where algorithms are ignored
const categoriesToIgnore = [
  "projecteuler",
  "test",
  "tests",
  "github",
  "ipynbcheckpoints",
  "leetcode",
  "spec",
  // Because of weird swift algorithm structure
  "minimax",
];
// Categories where algorithms are included, but not the category
const categoriesToSkip = ["main", "src", "algorithms", "problems"];

(async () => {
  spinner = ora("Downloading repositories").start();
  if (fs.existsSync("public/data"))
    await fs.promises.rm("public/data", { recursive: true });
  await fs.promises.mkdir("public/data");
  await fs.promises.mkdir("public/data/repositories");
  process.chdir("public/data/repositories");
  await Promise.all(
    [...Object.keys(Repositories), "algorithms-explanation"].map(
      (repo) =>
        new Promise<void>((resolve, reject) => {
          exec(
            `git clone --depth 1 https://github.com/TheAlgorithms/${repo}.git`,
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
  ) as Language[]) {
    const repo: Repository = Repositories[language];
    languages[language] = [];
    for await (const dir of walk(path.join(language, repo.baseDir))) {
      let valid = false;
      for (const validFilename of repo.allowedFiles) {
        if (dir.endsWith(validFilename)) valid = true;
      }
      if (!valid) continue;
      if (!isValidCategory(dir)) continue;
      if (
        dir.split(path.sep).length -
          path.join(language, repo.baseDir).split(path.sep).length <
        2
      )
        continue; // Ignore top level files
      const name = normalizeTitle(
        dir.split(path.sep).pop().split(".")[0].replace(/_/g, " ")
      );
      for (const namePart of name.split(" "))
        if (normalize(namePart) === "test" || normalize(namePart) === "tests")
          valid = false;
      if (!valid) continue;
      const nName = normalize(name);
      if (algorithmsToIgnore.includes(nName)) continue;
      const lCategories = dir
        .split(path.sep)
        .slice(
          path.join(language, repo.baseDir).split(path.sep).length,
          dir.split(path.sep).length - 1
        )
        .filter((category) => !categoriesToSkip.includes(normalize(category)))
        .map(normalizeTitle)
        .map(normalizeCategory);
      if (
        normalize(lCategories[lCategories.length - 1] || "") ===
        normalize(normalizeCategory(normalizeTitle(name)))
      )
        lCategories.pop();
      if (!algorithms[nName]) {
        algorithms[nName] = {
          slug: normalizeWeak(name),
          name,
          categories: lCategories.map(normalize),
          body: {},
          implementations: {},
          contributors: [],
          explanationUrl: {},
        };
        for (const category of lCategories) {
          if (!categories[normalize(category)]) {
            categories[normalize(category)] = [];
          }
          categories[normalize(category)].push(normalizeWeak(name));
        }
      }
      for (const category of lCategories) {
        if (!categoryNames[normalize(category)]) {
          categoryNames[normalize(category)] = category;
        }
      }
      algorithms[nName].implementations[language] = {
        dir: path.join(...dir.split(path.sep).slice(1)),
        url: `https://github.com/TheAlgorithms/${language}/tree/master/${path.join(
          ...dir.split(path.sep).slice(1)
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
    const directory = (await fs.promises.readFile("README.md")).toString();
    let aCategories = [];
    languages["c-sharp"] = [];
    await Promise.all(
      directory.split("\n").map(async (line) => {
        for (let i = 0; i < 6; i += 1) {
          if (
            line.startsWith(`${"  ".repeat(i)}*`) ||
            line.startsWith(`${"	".repeat(i)}*`)
          ) {
            const algorithmMatch = line
              .substr(2 * i + 1)
              .match(/\[(.+)\]\((.+\/(.+)(?:\.cs))\)/);
            const categoryMatch = line
              .substr(2 * i + 1)
              .match(/\[(.+)\]\((.+)\)/);
            aCategories.length = i;
            if (algorithmMatch) {
              const name = algorithmMatch[1];
              const nName = normalizeAlgorithm(name);
              const dir = algorithmMatch[2].replace(
                "https://github.com/TheAlgorithms/C-Sharp/blob/master/",
                ""
              );
              if (!algorithms[nName]) {
                algorithms[nName] = {
                  slug: normalizeWeak(name),
                  name,
                  categories: aCategories
                    .filter((x) => !!x && x !== "Algorithms")
                    .map(normalizeTitle)
                    .map(normalizeCategory)
                    .map(normalize),
                  body: {},
                  implementations: {},
                  contributors: [],
                  explanationUrl: {},
                };
                for (const category of aCategories
                  .filter((x) => !!x && x !== "Algorithms")
                  .map(normalizeTitle)
                  .map(normalizeCategory)) {
                  if (!categories[normalizeCategory(category)])
                    categories[normalizeCategory(category)] = [];
                  if (!categoryNames[normalize(category)]) {
                    categoryNames[normalize(category)] = category;
                  }
                  categories[normalizeCategory(category)].push(
                    normalizeWeak(name)
                  );
                }
              }
              languages["c-sharp"].push(algorithms[nName].slug);
              let file: string;
              try {
                file = (await fs.promises.readFile(dir)).toString();
              } catch {
                console.warn(`\nFailed to get ${dir}`);
                continue;
              }
              algorithms[nName].implementations["c-sharp"] = {
                dir,
                url: `https://github.com/TheAlgorithms/C-Sharp/tree/master${algorithmMatch[2].slice(
                  1
                )}`,
                code: highlightCode(file, "c-sharp"),
              };
            } else if (categoryMatch) {
              // eslint-disable-next-line prefer-destructuring
              aCategories[i] = categoryMatch[1];
            }
          }
        }
      })
    );
  })();
  process.chdir("..");
  spinner.succeed();

  spinner = ora("Fetching GitHub stars").start();
  // Fetch stars
  let stars: { [key: string]: number } = {};
  let errors = [];
  await Promise.all(
    Object.keys(Repositories).map<void>(async (repo) => {
      let repoStars = 0;
      try {
        const { data } = await octokit.request("GET /repos/{owner}/{repo}", {
          owner: "TheAlgorithms",
          repo,
        });
        repoStars = data.stargazers_count;
      } catch {
        errors.push(repo);
      }
      stars[repo] = repoStars;
    })
  );
  if (errors.length > 0)
    spinner.warn(
      `Failed to get stars for ${errors.length} ${
        errors.length === 1 ? "repository" : "repositories"
      }, using 0 as values instead (likely API rate limit exceeded)`
    );
  else spinner.succeed();
  spinner = ora("Collecting and rendering explanations").start();
  process.chdir("./algorithms-explanation");
  await Promise.all(
    locales.map(async (locale) => {
      if (fs.existsSync(locale.code)) {
        for await (const dir of walk(locale.code)) {
          const match = dir.replace(/\\/g, "/").match(/(?:.+)\/(.+)\.md/);
          if (match) {
            const algorithm = algorithms[normalizeAlgorithm(match[1])];
            if (algorithm) {
              algorithm.explanationUrl[
                locale.code
              ] = `https://github.com/TheAlgorithms/Algorithms-Explanation/tree/master/${dir}`;
              algorithm.body[locale.code] = await renderMarkdown(
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
          algorithm.body.all = render;
        }
      })
    )
  );
  spinner.succeed();
  spinner = ora(
    `Collecting contributors ${
      !process.env.GH_TOKEN ? chalk.gray("(without GitHub token)") : ""
    }`
  ).start();
  let requests = 0;
  let possibleAuthors: { [login: string]: any } = {};
  await Promise.all(
    Object.keys(Repositories).map<void>(
      (repo) =>
        new Promise<void>((resolve, reject) => {
          exec(
            "git log --name-status",
            { cwd: repo, maxBuffer: 1024 * 1024 * 2 },
            (err, stdout) => {
              if (err) reject(err);
              let author = "";
              for (const line of stdout.split("\n")) {
                if (line.startsWith("Author:")) author = line.slice(8);
                if (line.startsWith("M\t") || line.startsWith("A\t")) {
                  const [, name, email] = author.match(/^(.*) <(.+)>$/);
                  if (email) {
                    if (!authors[email])
                      authors[email] = {
                        name,
                        email,
                        algorithms: [],
                      };
                    authors[email].algorithms.push(
                      algorithms[
                        normalize(line.slice(8).split("/").pop().split(".")[0])
                      ]
                    );
                  }
                }
              }
              async function collectContributors(page = 0) {
                requests += 1;
                const { data } = await octokit.request(
                  `GET /repos/{owner}/{repo}/contributors`,
                  {
                    owner: "TheAlgorithms",
                    repo,
                    per_page: 100,
                    page,
                  }
                );
                for (const contributor of data) {
                  if (!possibleAuthors[contributor.login])
                    possibleAuthors[contributor.login] = contributor;
                }
                if (data.length === 100) {
                  await collectContributors(page + 1);
                }
              }
              if (process.env.GH_TOKEN)
                collectContributors(0).then(() => {
                  resolve();
                });
              else resolve();
            }
          );
        })
    )
  );
  // Try to get GitHub avatars and usernames (uses arround 1400/5000 requests to GitHub API)

  // This is needed because the GitHub API somehow
  // doesn't give me the user email before
  await Promise.all(
    Object.values(possibleAuthors).map<void>(async (author: any) => {
      requests += 1;
      const { data } = await octokit.request(`GET /users/{username}`, {
        username: author.login,
      });
      author.email = data.email;
      author.login = data.login;
    })
  );
  Object.values(authors).forEach((author) => {
    if (author.name === "github-actions") return;
    const authorFromApi = Object.values(possibleAuthors).find(
      (x) =>
        x.email === author.email ||
        `${x.login}@users.noreply.github.com` === author.email
    );
    if (authorFromApi) {
      author.login = authorFromApi.login;
      author.avatar = `${authorFromApi.avatar_url}&s=80`;
    }
    author.algorithms.forEach((algorithm) => {
      if (algorithm) {
        const existing = algorithm.contributors.find(
          (x) => x.email === author.email
        );
        if (!existing) {
          const contributor = { ...author, commits: 1 };
          delete contributor.algorithms;
          algorithm.contributors.push(contributor);
        } else {
          existing.commits += 1;
        }
      }
    });
  });
  Object.values(algorithms).forEach((algorithm) =>
    algorithm.contributors.sort((a, b) => a.commits - b.commits)
  );

  if (process.env.GH_TOKEN)
    spinner.text += chalk.gray(` (${requests} requests sent to GitHub API)`);
  spinner.succeed();
  process.chdir("..");

  spinner = ora("Writing algorithms to files").start();
  await fs.promises.mkdir("algorithms");
  await Promise.all(
    Object.values(algorithms).map(async (algorithm) => {
      await fs.promises.writeFile(
        path.join("algorithms", `${algorithm.slug}.json`),
        JSON.stringify(algorithm, null, 2)
      );
    })
  );
  await fs.promises.mkdir("algorithms-min");
  await Promise.all(
    Object.values(algorithms).map(async (algorithm) => {
      delete algorithm.body;
      Object.keys(algorithm.implementations).forEach((key) => {
        algorithm.implementations[key] = "";
      });
      await fs.promises.writeFile(
        path.join("algorithms-min", `${algorithm.slug}.json`),
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
  await fs.promises.writeFile("stars.json", JSON.stringify(stars));
  await fs.promises.writeFile("categories.json", JSON.stringify(categories));
  await fs.promises.writeFile("languages.json", JSON.stringify(languages));
  const oldLocalesCategories: { [key: string]: string } = fs.existsSync(
    "../locales/en/categories.json"
  )
    ? JSON.parse(
        (await fs.promises.readFile("../locales/en/categories.json")).toString()
      )
    : {};
  const localesCategories: { [key: string]: string } = {};
  Object.keys(categoryNames)
    .sort()
    .forEach((key) => {
      localesCategories[key] = oldLocalesCategories[key] || categoryNames[key];
    });
  await fs.promises.writeFile(
    "../locales/en/categories.json",
    JSON.stringify(localesCategories, null, 4)
  );
  await fs.promises.rm("repositories", { recursive: true });
  spinner.succeed();
  if (process.env.S3_ACCESS_KEY_ID && process.env.S3_SECRET_ACCESS_KEY) {
    spinner = ora("Uploading results to AWS S3 [Clearing bucket]").start();
    const s3 = new AWS.S3({
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    });
    // Clear the whole bucket
    {
      const currentObjects = (
        await s3
          .listObjects({
            Bucket: "thealgorithms",
          })
          .promise()
      ).Contents.map((x) => ({ Key: x.Key }));
      if (currentObjects.length !== 0) {
        await s3
          .deleteObjects({
            Bucket: "thealgorithms",
            Delete: {
              Objects: currentObjects,
            },
          })
          .promise();
      }
    }
    // Upload the new files
    {
      const files = await asyncWalk(".");
      let uploaded = 0;
      const total = files.length;
      spinner.text = `Uploading results to AWS S3 [Uploaded ${uploaded}/${total}]`;
      await Promise.all(
        files.map(async (file) =>
          s3
            .upload({
              Bucket: "thealgorithms",
              Key: file,
              Body: await fs.promises.readFile(file),
            })
            .promise()
            .then(() => {
              uploaded += 1;
              spinner.text = `Uploading results to AWS S3 [Uploaded ${uploaded}/${total}]`;
            })
        )
      );
    }
    spinner.succeed();
  }
})();

function isValidCategory(name: string) {
  if (normalize(name).match(/problem\d+/)) return false;
  for (const exclude of categoriesToIgnore)
    for (const category of name.split(path.sep))
      if (normalize(category) === normalize(exclude)) return false;
  for (const exclude of ["__init__", "mod.rs"])
    for (const category of name.split(path.sep))
      if (category === exclude) return false;
  return true;
}
