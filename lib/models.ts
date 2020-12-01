export interface Algorithm {
  slug: string;
  name: string;
  description?: string;
  category: string;
  subCategory?: string;
  implementations: { [language: string]: string };
}
