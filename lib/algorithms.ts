import fs from "fs";
import path from "path";
import locales from "lib/locales";
import type { Algorithm } from "./models";

const allAlgorithms: Algorithm[] = JSON.parse(
  fs.readFileSync(path.join("tmp", "algorithms.json")).toString()
);

export function getAlgorithmSlugs() {
  return allAlgorithms.flatMap((algorithm) =>
    locales.map((locale) => ({
      params: {
        algorithm: algorithm.slug,
      },
      locale,
    }))
  );
}

export function getAlgorithm(slug: string) {
  const algorithm: Algorithm = allAlgorithms.find((x) => x.slug === slug);
  return algorithm;
}

export function getAllAlgorithms() {
  return allAlgorithms;
}
