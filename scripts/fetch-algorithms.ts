import ora from "ora";
import fetch from "node-fetch";
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import { Algorithm } from "@/lib/models";
import atob from "atob";

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

  for (const el of [
    "Python",
    "C",
    "Javascript",
    "C-Plus-Plus",
    "Java",
    "Ruby",
    "F-Sharp",
    "Go",
    "Rust",
    "AArch64_Assembly",
    "C-Sharp",
    "Dart",
    "R",
    "PHP",
    "Elixir",
    "Kotlin",
    // "Scala",
    "Jupyter",
    "Haskell",
    "OCaml",
    "Swift",
    "Elm",
    // "MATLAB-Octave",
  ]) {
    const spinner = ora(el).start();
    const fresponse = await fetch(
      `https://raw.githubusercontent.com/TheAlgorithms/${el}/master/DIRECTORY.md`
    );
    if (fresponse.ok) {
      parseData(el, await fresponse.text());
      spinner.succeed();
    } else {
      spinner.fail(`DIRECTORY.md for ${el} not found`);
    }
  }
  let spinner = ora("Fetching explanations").start();
  const explanations = await (
    await fetch(
      "https://api.github.com/repos/TheAlgorithms/Algorithms-Explanation/git/trees/master?recursive=2"
    )
  ).json();
  try {
    for (const explanation of explanations.tree) {
      const match = explanation.path.match(/en\/(?:.+)\/(.+)\.md/);
      if (match) {
        const algorithm = algorithms.find(
          (algorithm) => normalize(algorithm.slug) == normalize(match[1])
        );
        if (algorithm) {
          const data = await (await fetch(explanation.url)).json();
          algorithm.body = atob(data.content).split("\n").slice(1).join("\n");
        }
      }
    }
    spinner.succeed();
  } catch (error) {
    spinner.fail(
      `Error while fetching explanations: ${explanations.message || error}`
    );
  }
  console.log();
  spinner = ora("Saving algorithms to files").start();

  for (const algorithm of algorithms) {
    await fsPromises.writeFile(
      path.join(algorithmsDirectory, `${algorithm.slug}.json`),
      JSON.stringify(algorithm, null, 2)
    );
  }

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
  let categories = [];
  data.split("\n").forEach((line) => {
    if (line.startsWith("##")) {
      categories = [line.substr(2).trim()];
    }
    for (let i = 1; i < 4; i++) {
      if (
        line.startsWith(`${"  ".repeat(i)}*`) ||
        line.startsWith(`${"	".repeat(i)}*`)
      ) {
        const match = line
          .substr(2 * i + 1)
          .match(/\[(.+)\]\((.+\/(.+)(?:\..+))\)/);
        categories.length = i;
        if (match) addAlgorithmFromMatch(match, lang, [...categories]);
        else categories[i] = line.substr(2 * i + 1).trim();
      }
    }
  });
}

function addAlgorithmFromMatch(match, lang, algorithmCategories) {
  let algorithm = algorithms.find(
    (algorithm) => normalize(algorithm.slug) == normalize(match[3])
  );
  if (!algorithm) {
    algorithm = {
      slug: normalizeWeak(match[3]),
      name: match[1],
      categories: algorithmCategories,
      implementations: {},
      code: "",
    };
    for (const category of algorithmCategories) {
      if (categories[normalize(category)])
        categories[normalize(category)].push(algorithm.slug);
      else categories[normalize(category)] = [algorithm.slug];
    }
    algorithms.push(algorithm);
  }
  algorithm.implementations[lang] = match[2];
}

async function getGithubCode(url: string) {
  const reqUrl = url
    .replace("github.com", "raw.githubusercontent.com")
    .replace("/blob", "");
  const response = await fetch(encodeURI(reqUrl));
  return await response.text();
}

function normalize(st: string) {
  return st
    .normalize()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function normalizeWeak(st: string) {
  return st
    .normalize()
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/ /g, "-")
    .replace(/[^a-z0-9\-]/g, "");
}
