import fs from "fs";
import path from "path";
import { Algorithm } from "./models";
import { normalize, normalizeWeak } from "./normalize";

const cacheDirectory = path.join(process.cwd(), "cache");
const algorithmsDirectory = path.join(cacheDirectory, "algorithms");

export function getLanguages() {
  const languages = [];
  for (const file of fs.readdirSync(algorithmsDirectory)) {
    const fileLanguages = Object.keys(
      JSON.parse(
        fs.readFileSync(path.join(algorithmsDirectory, file)).toString()
      ).implementations
    );
    fileLanguages.forEach((language: string) => {
      if (!languages.find((el) => normalize(el) == normalize(language)))
        languages.push(language);
    });
  }
  return languages.map((language) => ({
    params: {
      language: normalize(language),
    },
  }));
}

export function getLanguage(language: string) {
  const algorithms = [];
  let languageName;
  for (const file of fs.readdirSync(algorithmsDirectory)) {
    const algorithm: Algorithm = JSON.parse(
      fs.readFileSync(path.join(algorithmsDirectory, file)).toString()
    );
    Object.keys(algorithm.implementations).forEach((algorithmLanguage) => {
      if (normalize(language) == normalize(algorithmLanguage)) {
        languageName = algorithmLanguage;
        algorithms.push(algorithm);
      }
    });
  }
  return {
    name: languageName,
    algorithms,
  };
}
