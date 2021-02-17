import fs from "fs";
import path from "path";
import type { Algorithm } from "./models";
import highlightCode from "./highlight";

const cacheDirectory = path.join(process.cwd(), "cache");
const algorithmsDirectory = path.join(cacheDirectory, "algorithms");

export function getAlgorithmSlugs() {
  return fs.readdirSync(algorithmsDirectory).map((file) => ({
    params: {
      slug: file.replace(".json", ""),
    },
  }));
}

export function getAlgorithm(slug: string) {
  const algorithm: Algorithm = JSON.parse(
    fs.readFileSync(path.join(algorithmsDirectory, `${slug}.json`)).toString()
  );
  return algorithm;
}

export async function getAlgorithmCode(algorithm: Algorithm) {
  const exampleLanguage = Object.keys(algorithm.implementations)[0];
  const codeUrl = algorithm.implementations[exampleLanguage]
    .replace("github.com", "raw.githubusercontent.com")
    .replace("/blob", "");
  const codeResponse = await fetch(codeUrl);
  const codeText = await codeResponse.text();
  const codeHighlight = highlightCode(codeText, exampleLanguage);
  return codeHighlight;
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
