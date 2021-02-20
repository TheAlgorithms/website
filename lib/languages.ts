import fs from "fs";
import path from "path";
import { Algorithm, Languages } from "./models";
import { normalize } from "./normalize";

const allAlgorithms: Algorithm[] = JSON.parse(
  fs.readFileSync(path.join("cache", "algorithms.json")).toString()
);

export function getLanguages() {
  return Object.keys(Languages).map((language) => ({
    params: {
      language,
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
