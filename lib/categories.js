import fs from "fs";
import path from "path";
import { normalize, normalizeWeak } from "./normalize";

const cacheDirectory = path.join(process.cwd(), "cache");
const algorithmsDirectory = path.join(cacheDirectory, "algorithms");

export function getCategories() {
  const categories = [];
  for (const file of fs.readdirSync(algorithmsDirectory)) {
    const category = JSON.parse(
      fs.readFileSync(path.join(algorithmsDirectory, file))
    ).category;
    if (!categories.find((el) => normalize(el) == normalize(category)))
      categories.push(category);
  }
  return categories.map((category) => ({
    params: {
      category: normalize(category),
    },
  }));
}

export function getCategory(category) {
  const algorithms = [];
  for (const file of fs.readdirSync(algorithmsDirectory)) {
    const algorithm = JSON.parse(
      fs.readFileSync(path.join(algorithmsDirectory, file))
    );
    if (normalize(algorithm.category) == normalize(category))
      algorithms.push(algorithm);
  }
  return {
    name: algorithms[0].category,
    algorithms,
  };
}
