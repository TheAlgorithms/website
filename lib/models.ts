import type { Language } from "./repositories";

export interface Algorithm {
  slug: string;
  name: string;
  body: { [locale: string]: string };
  explanationUrl: { [locale: string]: string };
  categories: string[];
  implementations: { [key in Language]?: Implementation };
}

export interface Implementation {
  dir: string;
  url: string;
  code: string;
}
