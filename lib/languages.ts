import fs from "fs";
import path from "path";
import locales from "lib/locales";
import { Algorithm } from "./models";
import { Repositories } from "./repositories";
import { DATA_DIR } from "./constants";

export function getLanguages() {
  return Object.keys(Repositories).flatMap((language) =>
    locales.map((locale) => ({
      params: {
        language,
      },
      locale: locale.code,
    }))
  );
}

export async function getLanguage(language: string) {
  const languages: { [language: string]: string[] } = JSON.parse(
    (
      await fs.promises.readFile(path.join(DATA_DIR, "languages.json"))
    ).toString()
  );
  const algorithms: Algorithm[] = await Promise.all(
    languages[language].map(async (algorithmName) =>
      JSON.parse(
        (
          await fs.promises.readFile(
            path.join(DATA_DIR, "algorithms-min", `${algorithmName}.json`)
          )
        ).toString()
      )
    )
  );
  return {
    name: language,
    algorithms,
  };
}
