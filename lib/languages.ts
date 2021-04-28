import fs from "fs";
import path from "path";
import locales from "lib/locales";
import { Algorithm } from "./models";
import { Repositories } from "./repositories";
import { normalize } from "./normalize";

const allAlgorithms: Algorithm[] = JSON.parse(
  fs.readFileSync(path.join("tmp", "algorithms.json")).toString()
);

export function getLanguages() {
  return Object.keys(Repositories).flatMap((language) =>
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
