import path from "path";
import locales from "lib/locales";
import { Algorithm } from "./models";
import { Repositories } from "./repositories";
import { dataGetFile } from "./fs";

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
    await dataGetFile("languages.json")
  );
  if (!languages[language]) return undefined;
  const algorithms: Algorithm[] = await Promise.all(
    languages[language].map(async (algorithmName) =>
      JSON.parse(
        (
          await dataGetFile(
            path.join("algorithms-min", `${algorithmName}.json`)
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
