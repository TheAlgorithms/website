export interface Algorithm {
  slug: string;
  name: string;
  description?: string;
  categories: string[];
  implementations: { [language: string]: string };
}
