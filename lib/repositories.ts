export const Repositories = {
  python: {
    name: "Python",
    allowedFiles: [".py"],
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
  java: {
    name: "Java",
    allowedFiles: [".java"],
    baseDir: "src/main/java/com/thealgorithms",
  },
  "c-sharp": {
    name: "C#",
  },
  c: {
    name: "C",
    allowedFiles: [".c"],
    baseDir: ".",
  },
  haskell: {
    name: "Haskell",
    allowedFiles: [".hs"],
    baseDir: "src",
  },
  "f-sharp": {
    name: "F#",
    allowedFiles: [".fs"],
    baseDir: "Algorithms",
  },
  nim: {
    name: "Nim",
    allowedFiles: [".nim"],
    baseDir: ".",
  },
  go: {
    name: "Go",
    allowedFiles: [".go"],
    baseDir: ".",
  },
  rust: {
    name: "Rust",
    allowedFiles: [".rs"],
    baseDir: "src",
  },
  aarch64_assembly: {
    name: "AArch64 Assembly",
    allowedFiles: [".s"],
    baseDir: ".",
  },
  dart: {
    name: "Dart",
    allowedFiles: [".dart"],
    baseDir: ".",
  },
  r: {
    name: "R",
    allowedFiles: [".r"],
    baseDir: ".",
  },
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
  elixir: {
    name: "Elixir",
    allowedFiles: [".ex"],
    baseDir: "lib",
  },
  kotlin: {
    name: "Kotlin",
    allowedFiles: [".kt"],
    baseDir: "src/main/kotlin",
  },
  scala: {
    name: "Scala",
    allowedFiles: [".scala"],
    baseDir: "src/main/scala",
  },
  jupyter: {
    name: "Jupyter",
    allowedFiles: [".ipynb"],
    baseDir: ".",
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
  elm: {
    name: "Elm",
    allowedFiles: [".elm"],
    baseDir: "src",
  },
  "matlab-octave": {
    name: "MATLAB Octave",
    allowedFiles: [".m"],
    baseDir: "algorithms",
  },
  julia: {
    name: "Julia",
    allowedFiles: [".jl"],
    baseDir: "src",
  },
  lua: {
    name: "Lua",
    allowedFiles: [".lua"],
    baseDir: "src",
  },
  typescript: {
    name: "TypeScript",
    allowedFiles: [".ts"],
    baseDir: ".",
  },
  zig: {
    name: "Zig",
    allowedFiles: [".zig"],
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
