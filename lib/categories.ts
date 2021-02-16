import fs from "fs";
import path from "path";
import { stdout } from "process";
import { Algorithm } from "./models";
import { normalize, normalizeWeak } from "./normalize";

const cacheDirectory = path.join(process.cwd(), "cache");
const algorithmsDirectory = path.join(cacheDirectory, "algorithms");
const allAlgorithms = JSON.parse(
  fs.readFileSync(path.join("cache", "algorithms.json")).toString()
);

export function getCategories() {
  const categories = [];
  for (const file of fs.readdirSync(algorithmsDirectory)) {
    const fileCategories = JSON.parse(
      fs.readFileSync(path.join(algorithmsDirectory, file)).toString()
    ).categories;
    fileCategories.forEach((category: string) => {
      if (!categories.find((el) => normalize(el) == normalize(category)))
        categories.push(category);
    });
  }
  return categories.map((category) => ({
    params: {
      category: normalize(category),
    },
  }));
}

export function getCategory(category: string) {
  const algorithms = [];
  let categoryName: string;
  for (const algorithm of allAlgorithms) {
    algorithm.categories.forEach((algorithmCategory) => {
      if (normalize(category) == normalize(algorithmCategory)) {
        categoryName = algorithmCategory;
        algorithms.push(algorithm);
      }
    });
  }
  return {
    name: categoryName,
    algorithms,
  };
}
