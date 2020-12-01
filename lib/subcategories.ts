import fs from "fs";
import path from "path";
import { normalize, normalizeWeak } from "./normalize";
import type { Algorithm } from "./models";

const cacheDirectory = path.join(process.cwd(), "cache");
const algorithmsDirectory = path.join(cacheDirectory, "algorithms");

export function getSubCategories() {
  const subCategories: {
    params: {
      category: string;
      subCategory: string;
    };
  }[] = [];
  for (const file of fs.readdirSync(algorithmsDirectory)) {
    const algorithm: Algorithm = JSON.parse(
      fs.readFileSync(path.join(algorithmsDirectory, file)).toString()
    );
    if (
      algorithm.subCategory &&
      !subCategories.find(
        (el) =>
          el.params.subCategory == normalize(algorithm.subCategory) &&
          el.params.category == normalize(algorithm.category)
      )
    )
      subCategories.push({
        params: {
          category: normalize(algorithm.category),
          subCategory: normalize(algorithm.subCategory),
        },
      });
  }
  return subCategories;
}

export function getSubCategory(category: string, subCategory: string) {
  const algorithms: Algorithm[] = [];
  for (const file of fs.readdirSync(algorithmsDirectory)) {
    const algorithm: Algorithm = JSON.parse(
      fs.readFileSync(path.join(algorithmsDirectory, file)).toString()
    );
    if (
      algorithm.subCategory &&
      normalize(algorithm.subCategory) == normalize(subCategory)
    )
      algorithms.push(algorithm);
  }
  return {
    category: algorithms[0].category,
    name: algorithms[0].subCategory,
    algorithms,
  };
}
