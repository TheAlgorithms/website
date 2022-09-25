import fs from "fs";
import path from "path";
import locales from "lib/locales";
import type { Algorithm } from "./models";
import { DATA_DIR } from "./constants";
import { dataGetDir, dataGetFile } from "./fs";

export async function getAlgorithmSlugs() {
  return (await dataGetDir("algorithms")).flatMap((file) =>
    locales.map((locale) => ({
      params: {
        algorithm: file.replace(".json", ""),
      },
      locale: locale.code,
    }))
  );
}

export async function getAlgorithm(slug: string, minimal = false) {
  const file = await dataGetFile(
    path.join(minimal ? "algorithms-min" : "algorithms", `${slug}.json`)
  );
  if (!file) return undefined;
  const algorithm: Algorithm = JSON.parse(file);
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
