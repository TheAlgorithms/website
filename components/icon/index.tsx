import { Tooltip, Icon } from "@material-ui/core";
import React from "react";
import { Language } from "lib/models";

export default function LanguageIcon({
  language,
  tooltip,
}: {
  language: Language;
  tooltip?: string;
}) {
  const icon = (className: string) => (
    <Tooltip title={tooltip || ""}>
      <Icon color="disabled" className={className} />
    </Tooltip>
  );

  // const textIcon = (text: string) => (
  //   <Tooltip title={tooltip || ""}>
  //     <Typography className={classes.textIcon}>{text}</Typography>
  //   </Tooltip>
  // );

  switch (language.toLowerCase() as Language | string) {
    case "ruby":
      return icon("devicon-ruby-plain");
    case "python":
      return icon("devicon-python-plain");
    case "javascript":
      return icon("devicon-javascript-plain");
    case "c-plus-plus":
      return icon("devicon-cplusplus-plain");
    case "java":
      return icon("devicon-java-plain");
    case "c":
      return icon("devicon-c-plain");
    case "f-sharp":
      return icon("devicon-fsharp-plain");
    case "go":
      return icon("devicon-go-plain");
    case "rust":
      return icon("devicon-rust-plain");
    case "aarch64_assembly":
      return icon("devicon-aarch64-plain");
    case "c-sharp":
      return icon("devicon-csharp-plain");
    case "dart":
      return icon("devicon-flutter-plain");
    case "r":
      return icon("devicon-r-plain");
    case "php":
      return icon("devicon-php-plain");
    case "elixir":
      return icon("devicon-elixir-plain");
    case "kotlin":
      return icon("devicon-kotlin-plain");
    case "scala":
      return icon("devicon-scala-plain");
    case "jupyter":
      return icon("devicon-jupyter-plain-wordmark");
    case "haskell":
      return icon("devicon-haskell-plain");
    case "ocaml":
      return icon("devicon-ocaml-plain");
    case "swift":
      return icon("devicon-swift-plain");
    case "elm":
      return icon("devicon-elm-plain");
    case "matlab-octave":
      return icon("devicon-matlab-plain");
    default:
      throw new Error(`Missing icon for ${language}`);
  }
}
