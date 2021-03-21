import fs from "fs";
import path from "path";
import locales from "lib/locales";
import { Algorithm, Languages } from "./models";
import { normalize } from "./normalize";

const allAlgorithms: Algorithm[] = JSON.parse(
  fs.readFileSync(path.join("cache", "algorithms.json")).toString()
);

export function getLanguages() {
  return Object.keys(Languages).flatMap((language) =>
    locales.map((locale) => ({
      params: {
        language,
      },
      locale,
    }))
  );
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
