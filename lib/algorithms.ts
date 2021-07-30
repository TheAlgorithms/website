import fs from "fs";
import path from "path";
import locales from "lib/locales";
import type { Algorithm } from "./models";

export async function getAlgorithmSlugs() {
  return (await fs.promises.readdir("tmp/algorithms")).flatMap((file) =>
    locales.map((locale) => ({
      params: {
        algorithm: file.replace(".json", ""),
      },
      locale,
    }))
  );
}

export async function getAlgorithm(slug: string, minimal = false) {
  const algorithm: Algorithm = JSON.parse(
    (
      await fs.promises.readFile(path.join("tmp", "algorithms", `${slug}.json`))
    ).toString()
  );
  if (minimal) {
    delete algorithm.body;
    Object.keys(algorithm.implementations).forEach((key) => {
      algorithm.implementations[key] = "";
    });
  }
  return algorithm;
}

export async function getAllAlgorithms() {
  return (await Promise.all(
    (
      await fs.promises.readdir("tmp/algorithms")
    ).map(async (file) =>
      JSON.parse(
        (
          await fs.promises.readFile(path.join("tmp", "algorithms", file))
        ).toString()
      )
    )
  )) as Algorithm[];
}
