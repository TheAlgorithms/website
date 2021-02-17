import fs from "fs";
import path from "path";
import { Algorithm } from "./models";
import { normalize, normalizeWeak } from "./normalize";

const cacheDirectory = path.join(process.cwd(), "cache");
const algorithmsDirectory = path.join(cacheDirectory, "algorithms");
const allAlgorithms: Algorithm[] = JSON.parse(
  fs.readFileSync(path.join("cache", "algorithms.json")).toString()
);

export function getLanguages() {
  const languages = [];
  fs.readdirSync(algorithmsDirectory).forEach((file) => {
    const fileLanguages = Object.keys(
      JSON.parse(
        fs.readFileSync(path.join(algorithmsDirectory, file)).toString()
      ).implementations
    );
    fileLanguages.forEach((language: string) => {
      if (!languages.find((el) => normalize(el) === normalize(language)))
        languages.push(language);
    });
  });
  return languages.map((language) => ({
    params: {
      language: normalizeWeak(language),
    },
  }));
}

export function getLanguage(language: string) {
  const algorithms = [];
  allAlgorithms.forEach((algorithm) => {
    Object.keys(algorithm.implementations).forEach((algorithmLanguage) => {
      if (normalize(language) === normalize(algorithmLanguage)) {
        algorithms.push(algorithm);
      }
    });
  });
  return {
    name: language,
    algorithms,
  };
}
