const ora = require("ora");
const fetch = require("node-fetch");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const atob = require("atob");

const cacheDirectory = path.join(process.cwd(), "cache");
const algorithmsDirectory = path.join(cacheDirectory, "algorithms");

let algorithms = [];

(async () => {
  console.log("Fetching algorithms from github\n");

  if (fs.existsSync(cacheDirectory))
    fs.rmdirSync(cacheDirectory, { recursive: true });
  fs.mkdirSync(cacheDirectory);
  fs.mkdirSync(algorithmsDirectory);

  for (const el of ["python", "java", "c", "c-plus-plus", "go", "javascript"]) {
    const spinner = ora(el).start();
    const fresponse = await fetch(
      `https://raw.githubusercontent.com/TheAlgorithms/${el}/master/DIRECTORY.md`
    );
    if (fresponse.ok) {
      parseData(el, await fresponse.text());
      spinner.succeed();
    } else {
      spinner.fail(`${el} not found`);
    }
  }
  let spinner = ora("explanations").start();
  const explanations = await (
    await fetch(
      "https://api.github.com/repos/TheAlgorithms/Algorithms-Explanation/git/trees/master?recursive=2"
    )
  ).json();
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
  spinner.succeed();
})();

function parseData(lang, data) {
  let category = "";
  let subCategory = "";
  data.split("\n").forEach((line) => {
    if (line.startsWith("##")) {
      category = line.substr(2).trim();
    }
    if (line.startsWith("  *")) {
      const match = line.substr(3).match(/\[(.+)\]\((.+\/(.+)(?:\..+))\)/);
      if (match) addAlgorithmFromMatch(match, lang, [category]);
      else subCategory = line.substr(3).trim();
    }
    if (line.startsWith("    *")) {
      const match = line.substr(3).match(/\[(.+)\]\((.+\/(.+)(?:\..+))\)/);
      if (match) addAlgorithmFromMatch(match, lang, [category, subCategory]);
    }
  });
}

function addAlgorithmFromMatch(match, lang, categories) {
  let algorithm = algorithms.find(
    (algorithm) => normalize(algorithm.slug) == normalize(match[3])
  );
  if (!algorithm) {
    algorithm = {
      slug: normalizeWeak(match[3]),
      name: match[1],
      categories,
      implementations: {},
    };
    algorithms.push(algorithm);
  }
  algorithm.implementations[lang] = match[2];
}

function normalize(st) {
  return st
    .normalize()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function normalizeWeak(st) {
  return st
    .normalize()
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/ /g, "-")
    .replace(/[^a-z0-9\-]/g, "");
}
