import fs from "fs";
import path from "path";
import locales from "lib/locales";
import type { Algorithm, Language } from "./models";
import highlightCode from "./highlight";

const cacheDirectory = path.join(process.cwd(), "cache");
const algorithmsDirectory = path.join(cacheDirectory, "algorithms");

export function getAlgorithmSlugs() {
  return fs.readdirSync(algorithmsDirectory).flatMap((file) =>
    locales.map((locale) => ({
      params: {
        algorithm: file.replace(".json", ""),
      },
      locale,
    }))
  );
}

export function getAlgorithm(slug: string) {
  const algorithm: Algorithm = JSON.parse(
    fs.readFileSync(path.join(algorithmsDirectory, `${slug}.json`)).toString()
  );
  return algorithm;
}

export async function getAlgorithmCode(algorithm: Algorithm) {
  const res: { [language in Language]?: string } = {};
  Object.keys(algorithm.implementations).forEach((language) => {
    res[language] = ""; // Ensure right order
  });
  await Promise.all(
    Object.keys(algorithm.implementations).map(async (language) => {
      res[language] = highlightCode(
        await fetchCode(algorithm.implementations[language]),
        language
      );
    })
  );
  return res;
}

export async function fetchCode(url: string) {
  const rawUrl = new URL(
    url.replace("github.com", "raw.githubusercontent.com").replace("/blob", "")
  );
  return (await fetch(rawUrl.toString())).text();
}

export function getAllAlgorithms() {
  const algorithms: Algorithm[] = [];
  fs.readdirSync(algorithmsDirectory).forEach((file) => {
    algorithms.push(
      JSON.parse(
        fs.readFileSync(path.join(algorithmsDirectory, file)).toString()
      )
    );
  });
  return algorithms;
}
