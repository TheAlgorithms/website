import fs from "fs";
import path from "path";
import locales from "lib/locales";
import { normalize } from "./normalize";
import { Algorithm } from "./models";
import { DATA_DIR } from "./constants";

export async function getCategories() {
  const categories: string[] = Object.keys(
    JSON.parse(
      (
        await fs.promises.readFile(path.join(DATA_DIR, "categories.json"))
      ).toString()
    )
  );
  return categories.flatMap((category) =>
    locales.map((locale) => ({
      params: {
        category: normalize(category),
      },
      locale: locale.code,
    }))
  );
}

export async function getCategory(category: string) {
  const categories: { [category: string]: string[] } = JSON.parse(
    (
      await fs.promises.readFile(path.join(DATA_DIR, "categories.json"))
    ).toString()
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
            path.join(DATA_DIR, "algorithms-min", `${algorithmName}.json`)
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
