import fs from "fs";
import path from "path";
import { Algorithm } from "./models";
import normalize from "./normalize";

const cacheDirectory = path.join(process.cwd(), "cache");
const algorithmsDirectory = path.join(cacheDirectory, "algorithms");
const allAlgorithms: Algorithm[] = JSON.parse(
  fs.readFileSync(path.join("cache", "algorithms.json")).toString()
);

export function getCategories() {
  const categories = [];
  fs.readdirSync(algorithmsDirectory).forEach((file) => {
    const fileCategories = JSON.parse(
      fs.readFileSync(path.join(algorithmsDirectory, file)).toString()
    ).categories;
    fileCategories.forEach((category: string) => {
      if (!categories.find((el) => normalize(el) === normalize(category)))
        categories.push(category);
    });
  });
  return categories.map((category) => ({
    params: {
      category: normalize(category),
    },
  }));
}

export function getCategory(category: string) {
  const algorithms = [];
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
