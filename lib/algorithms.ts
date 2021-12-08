import fs from "fs";
import path from "path";
import locales from "lib/locales";
import type { Algorithm } from "./models";
import { DATA_DIR } from "./constants";

export async function getAlgorithmSlugs() {
  return (await fs.promises.readdir(path.join(DATA_DIR, "algorithms"))).flatMap(
    (file) =>
      locales.map((locale) => ({
        params: {
          algorithm: file.replace(".json", ""),
        },
        locale: locale.code,
      }))
  );
}

export async function getAlgorithm(slug: string, minimal = false) {
  const algorithm: Algorithm = JSON.parse(
    (
      await fs.promises.readFile(
        path.join(
          DATA_DIR,
          minimal ? "algorithms-min" : "algorithms",
          `${slug}.json`
        )
      )
    ).toString()
  );
  return algorithm;
}

export async function getAllAlgorithms() {
  return (await Promise.all(
    (
      await fs.promises.readdir(path.join(DATA_DIR, "algorithms-min"))
    ).map(async (file) =>
      JSON.parse(
        (
          await fs.promises.readFile(path.join(DATA_DIR, "algorithms", file))
        ).toString()
      )
    )
  )) as Algorithm[];
}
