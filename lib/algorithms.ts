import fs from "fs";
import path from "path";
import type { Algorithm } from "./models";

const cacheDirectory = path.join(process.cwd(), "cache");
const algorithmsDirectory = path.join(cacheDirectory, "algorithms");

export function getAlgorithmSlugs() {
  return fs.readdirSync(algorithmsDirectory).map((file) => ({
    params: {
      slug: file.replace(".json", ""),
    },
  }));
}

export function getAlgorithm(slug: string): Algorithm {
  return JSON.parse(
    fs.readFileSync(path.join(algorithmsDirectory, `${slug}.json`)).toString()
  );
}

export function getAllAlgorithms() {
  const algorithms: Algorithm[] = [];
  for (const file of fs.readdirSync(algorithmsDirectory)) {
    algorithms.push(
      JSON.parse(
        fs.readFileSync(path.join(algorithmsDirectory, file)).toString()
      )
    );
  }
  return algorithms;
}
