export const Repositories = {
  ruby: {
    name: "Ruby",
    allowedFiles: [".rb"],
    baseDir: ".",
  },
  php: {
    name: "PHP",
    allowedFiles: [".php"],
    baseDir: ".",
  },
  javascript: {
    name: "Javascript",
    allowedFiles: [".js", ".ts"],
    baseDir: ".",
  },
  "c-plus-plus": {
    name: "C++",
    allowedFiles: [".cpp", ".hpp", ".h"],
    baseDir: ".",
  },
  "c-sharp": {
    name: "C#",
  },
  elm: {
    name: "Elm",
    allowedFiles: [".elm"],
    baseDir: "src",
  },
  aarch64_assembly: {
    name: "AArch64",
    allowedFiles: [".s"],
    baseDir: ".",
  },
  rust: {
    name: "Rust",
    allowedFiles: [".rs"],
    baseDir: "src",
  },
  dart: {
    name: "Dart",
    allowedFiles: [".dart"],
    baseDir: ".",
  },
  scala: {
    name: "Scala",
    allowedFiles: [".scala"],
    baseDir: "src/main/scala",
  },
  java: {
    name: "Java",
    allowedFiles: [".java"],
    baseDir: ".",
  },
  c: {
    name: "C",
    allowedFiles: [".c"],
    baseDir: ".",
  },
  kotlin: {
    name: "Kotlin",
    allowedFiles: [".kt"],
    baseDir: "src/main/kotlin",
  },
  ocaml: {
    name: "OCaml",
    allowedFiles: [".ml"],
    baseDir: ".",
  },
  swift: {
    name: "Swift",
    allowedFiles: [".swift"],
    baseDir: ".",
  },
  "matlab-octave": {
    name: "MATLAB",
    allowedFiles: [".m"],
    baseDir: "algorithms",
  },
  go: {
    name: "Go",
    allowedFiles: [".go"],
    baseDir: ".",
  },
  r: {
    name: "R",
    allowedFiles: [".R"],
    baseDir: ".",
  },
  haskell: {
    name: "Haskell",
    allowedFiles: [".hs"],
    baseDir: "src",
  },
  python: {
    name: "Python",
    allowedFiles: [".py"],
    baseDir: ".",
  },
  "f-sharp": {
    name: "F#",
    allowedFiles: [".fs"],
    baseDir: "Algorithms",
  },
  elixir: {
    name: "Elixir",
    allowedFiles: [".ex"],
    baseDir: "lib",
  },
  jupyter: {
    name: "Jupyter",
    allowedFiles: [".ipynb"],
    baseDir: ".",
  },
};

export interface Repository {
  name: string;
  allowedFiles?: string[];
  baseDir?: string;
}

export type Language = keyof typeof Repositories;

export function getLanguageName(language: Language | string) {
  return Repositories[language.toLocaleLowerCase()].name;
}
