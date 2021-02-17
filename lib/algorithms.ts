import fs from "fs";
import path from "path";
import type { Algorithm, Language } from "./models";
import highlightCode from "./highlight";
import renderMarkdown from "./markdown";
import renderNotebook from "./notebookjs";

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
  const exampleLanguage = Object.keys(algorithm.implementations)[0] as Language;
  const codeText = await fetchCode(algorithm.implementations[exampleLanguage]);
  const codeHighlight = highlightCode(codeText, exampleLanguage);
  return codeHighlight;
}

export async function fetchCode(url: string) {
  const rawUrl = new URL(
    url.replace("github.com", "raw.githubusercontent.com").replace("/blob", "")
  );
  return (await fetch(rawUrl.toString())).text();
}

export async function getAlgorithmBody(algorithm: Algorithm) {
  if (algorithm.body) return renderMarkdown(algorithm.body);
  if (algorithm.implementations.jupyter) return renderNotebook(algorithm);
  return "";
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
