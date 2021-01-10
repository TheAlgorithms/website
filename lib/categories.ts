import fs from "fs";
import path from "path";
import { Algorithm } from "./models";
import { normalize, normalizeWeak } from "./normalize";

const cacheDirectory = path.join(process.cwd(), "cache");
const algorithmsDirectory = path.join(cacheDirectory, "algorithms");

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
  for (const file of fs.readdirSync(algorithmsDirectory)) {
    const algorithm: Algorithm = JSON.parse(
      fs.readFileSync(path.join(algorithmsDirectory, file)).toString()
    );
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
