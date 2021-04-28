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

export function getCategory(category: string) {
  const allAlgorithms: Algorithm[] = JSON.parse(
    fs.readFileSync(path.join("tmp", "algorithms.json")).toString()
  );
  const algorithms: Algorithm[] = [];
  let categoryName: string;
  allAlgorithms.forEach((algorithm) => {
    algorithm.categories.forEach((algorithmCategory) => {
      if (normalize(category) === normalize(algorithmCategory)) {
        categoryName = algorithmCategory;
        algorithms.push(algorithm);
      }
    });
  });
  return {
    name: categoryName,
    algorithms,
  };
}
