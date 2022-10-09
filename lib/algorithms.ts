import fs from "fs";
import path from "path";
import type { Algorithm } from "./models";
import { DATA_DIR } from "./constants";
import { dataGetDir, dataGetFile } from "./fs";

export async function getAlgorithmSlugs() {
  // This function is only used when localization is disabled,
  // so only the english URLs get returned.
  return (await dataGetDir("algorithms")).map((file) => ({
    params: {
      algorithm: file.replace(".json", ""),
    },
  }));
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
