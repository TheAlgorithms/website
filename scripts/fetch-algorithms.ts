/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import ora from "ora";
import fetch, { RequestInit } from "node-fetch";
import fs from "fs";
import path from "path";
import atob from "atob";
import btoa from "btoa";
import dotenv from "dotenv";
import locales from "../lib/locales";
import aliases from "../lib/aliases";
import { Algorithm, Languages } from "../lib/models";
import { normalize, normalizeWeak } from "../lib/normalize";

dotenv.config();
const fetchOptions: RequestInit = {
  headers:
    process.env.GH_USER && process.env.GH_TOKEN
      ? {
          Authorization: `Basic ${btoa(
            `${process.env.GH_USER}:${process.env.GH_TOKEN}`
          )}`,
        }
      : {},
};

const fsPromises = fs.promises;

const cacheDirectory = path.join(process.cwd(), "cache");
const algorithmsDirectory = path.join(cacheDirectory, "algorithms");

let algorithms: Algorithm[] = [];
let categories: { [category: string]: string[] } = {};

(async () => {
  console.log("Fetching algorithms from github\n");

  if (fs.existsSync(cacheDirectory))
    fs.rmdirSync(cacheDirectory, { recursive: true });
  fs.mkdirSync(cacheDirectory);
  fs.mkdirSync(algorithmsDirectory);

  let spinner = ora("Fetching DIRECTORY.md files").start();
  const files = await Promise.all(
    // eslint-disable-next-line consistent-return
    Object.keys(Languages).map(async (language) => {
      const fresponse = await fetch(
        `https://raw.githubusercontent.com/TheAlgorithms/${language}/master/DIRECTORY.md`
      );
      if (fresponse.ok) {
        return [language, await fresponse.text()];
      }
      spinner.fail(`DIRECTORY.md for ${language} not found`);
      process.exit(1);
    })
  );
  files.forEach(([language, text]) => parseData(language, text));
  spinner.succeed();
  spinner = ora("Fetching explanations").start();
  const explanations = await (
    await fetch(
      "https://api.github.com/repos/TheAlgorithms/Algorithms-Explanation/git/trees/master?recursive=2",
      fetchOptions
    )
  ).json();
  try {
    await Promise.all(
      locales.flatMap(async (locale) =>
        Promise.all(
          explanations.tree.map(async (explanation) => {
            const match = explanation.path.match(
              // eslint-disable-next-line no-useless-escape
              new RegExp(`${locale}\/(?:.+)\/(.+)\.md`)
            );
            if (match) {
              const algorithm = algorithms.find((alg) =>
                equals(alg.name, match[1])
              );
              if (algorithm) {
                const data = await (
                  await fetch(explanation.url, fetchOptions)
                ).json();
                algorithm.body[locale] = b64DecodeUnicode(data.content)
                  .split("\n")
                  .slice(1)
                  .join("\n");
              }
            }
          })
        )
      )
    );
    spinner.succeed();
  } catch (error) {
    spinner.fail(
      `Error while fetching explanations: ${explanations.message || error}`
    );
  }
  spinner = ora("Saving algorithms to files").start();

  await Promise.all(
    algorithms.map(async (algorithm) => {
      await fsPromises.writeFile(
        path.join(algorithmsDirectory, `${algorithm.slug}.json`),
        JSON.stringify(algorithm, null, 2)
      );
    })
  );

  await fsPromises.writeFile(
    path.join(cacheDirectory, "algorithms.json"),
    JSON.stringify(algorithms)
  );
  await fsPromises.writeFile(
    path.join(cacheDirectory, "categories.json"),
    JSON.stringify(categories)
  );
  spinner.succeed();
})();

function parseData(lang, data) {
  let aCategories = [];
  data.split("\n").forEach((line) => {
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
        if (match)
          addAlgorithmFromMatch(
            match,
            lang,
            aCategories.filter((el) => !!el)
          );
        else aCategories[i] = line.substr(2 * i + 1).trim();
      }
    }
  });
}

function addAlgorithmFromMatch(
  match: RegExpMatchArray,
  lang: string,
  algorithmCategories: string[]
) {
  let algorithm = algorithms.find(
    (alg) => normalize(alg.slug) === normalize(match[1])
  );
  if (!algorithm) {
    algorithm = {
      slug: normalizeWeak(match[1]),
      name: match[1],
      categories: algorithmCategories,
      implementations: {},
      code: "",
      body: {},
    };
    algorithms.push(algorithm);
  }
  algorithmCategories.forEach((category) => {
    if (categories[normalize(category)]) {
      if (!categories[normalize(category)].includes(algorithm.slug))
        categories[normalize(category)].push(algorithm.slug);
    } else categories[normalize(category)] = [algorithm.slug];
  });
  [, , algorithm.implementations[lang]] = match;
}

function equals(string1: string, string2: string) {
  if (normalize(string1) === normalize(string2)) {
    return true;
  }
  if (aliases[normalize(string1)]) {
    for (let i = 0; i < aliases[normalize(string1)].length; i += 1) {
      if (normalize(string2) === normalize(aliases[normalize(string1)][i])) {
        return true;
      }
    }
  }
  return false;
}

function b64DecodeUnicode(str) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(
    atob(str)
      .split("")
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join("")
  );
}
