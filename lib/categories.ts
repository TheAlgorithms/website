import fs from "fs";
import path from "path";
import locales from "lib/locales";
import { normalize, normalizeWeak } from "./normalize";
import { Algorithm } from "./models";

export function getCategories() {
  const categories: string[] = Object.keys(
    JSON.parse(fs.readFileSync(path.join("tmp", "categories.json")).toString())
  );
  return categories.flatMap((category) =>
    locales.map((locale) => ({
      params: {
        category: normalizeWeak(category),
      },
      locale,
    }))
  );
}

export async function getCategory(category: string) {
  const categories: { [category: string]: string[] } = JSON.parse(
    fs.readFileSync(path.join("tmp", "categories.json")).toString()
  );
  const categoryName = Object.keys(categories).find(
    (x) => normalize(x) === normalize(category)
  );
  const items = categories[categoryName];
  if (!items) throw new Error("Category not found");
  const algorithms: Algorithm[] = await Promise.all(
    items.map(async (algorithmName) =>
      JSON.parse(
        (
          await fs.promises.readFile(
            path.join("tmp", "algorithms", `${algorithmName}.json`)
          )
        ).toString()
      )
    )
  );
  return {
    name: categoryName,
    algorithms,
  };
}
