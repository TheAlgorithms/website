import path from "path";
import { Algorithm } from "./models";
import { Repositories } from "./repositories";
import { dataGetFile } from "./fs";

export function getLanguages() {
  // This function is only used when localization is disabled,
  // so only the english URLs get returned.
  return Object.keys(Repositories).flatMap((language) => ({
    params: {
      language,
    },
  }));
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
