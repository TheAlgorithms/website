import path from "path";
import { normalize } from "./normalize";
import { Algorithm } from "./models";
import { dataGetFile } from "./fs";
import getLocales from "./getLocales";
import { i18n } from "next-i18next";

export async function getCategories() {
  const categories: string[] = Object.keys(
    JSON.parse((await dataGetFile("categories.json")).toString())
  );
  return categories.flatMap((category) =>
    getLocales(i18n).map((locale) => ({
      params: {
        category: normalize(category),
      },
      locale: locale.code,
    }))
  );
}

export async function getCategory(category: string) {
  const categories: { [category: string]: string[] } = JSON.parse(
    (await dataGetFile("categories.json")).toString()
  );
  const categoryName = Object.keys(categories).find(
    (x) => normalize(x) === normalize(category)
  );
  if (!categoryName) return undefined;
  const items = categories[categoryName];
  if (!items) throw new Error("Category not found");
  const algorithms: Algorithm[] = await Promise.all(
    items.map(async (algorithmName) =>
      JSON.parse(
        (
          await dataGetFile(
            path.join("algorithms-min", `${algorithmName}.json`)
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
