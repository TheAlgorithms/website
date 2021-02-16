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
  ruby: "Ruby",
  python: "Python",
  javascript: "Javascript",
  "c-plus-plus": "C++",
  java: "Java",
  c: "C",
  "f-sharp": "F#",
  go: "Go",
  rust: "Rust",
  aarch64_assembly: "AArch64 Assembly",
  "c-sharp": "C#",
  dart: "Dart",
  r: "R",
  php: "PHP",
  elixir: "Elixir",
  kotlin: "Kotlin",
  scala: "Scala",
  jupyter: "Jupyter",
  haskell: "Haskell",
  ocaml: "OCaml",
  swift: "Swift",
  elm: "Elm",
  "matlab-octave": "MATLAB Octave",
};

export function getLanguageName(language: Language) {
  return Languages[language.toLocaleLowerCase()];
}
