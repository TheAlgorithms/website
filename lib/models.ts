export interface Algorithm {
  slug: string;
  name: string;
  body?: string;
  categories: string[];
  implementations: { [key in Language]?: string };
  code: string;
}

export type Language = keyof typeof Languages;

export const Languages = {
  python: "Python",
  javascript: "Javascript",
  "c-plus-plus": "C++",
  java: "Java",
  "c-sharp": "C#",
  c: "C",
  haskell: "Haskell",
  "f-sharp": "F#",
  go: "Go",
  rust: "Rust",
  "aarch64-assembly": "AArch64 Assembly",
  dart: "Dart",
  r: "R",
  ruby: "Ruby",
  php: "PHP",
  elixir: "Elixir",
  kotlin: "Kotlin",
  scala: "Scala",
  jupyter: "Jupyter",
  ocaml: "OCaml",
  swift: "Swift",
  elm: "Elm",
  "matlab-octave": "MATLAB Octave",
};

export function getLanguageName(language: Language) {
  return Languages[language.toLocaleLowerCase()];
}
