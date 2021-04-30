import { Tooltip, Icon } from "@material-ui/core";
import React from "react";
import { Language } from "lib/repositories";
import classes from "./style.module.css";

function icon(name: string, version: string) {
  return (
    <img
      src={`https://gitcdn.link/repo/devicons/devicon/master/icons/${name}/${name}-${version}.svg`}
      alt={name}
    />
  );
}

export default function LanguageIcon({
  language,
  tooltip,
  className = "",
  colored = false,
  color = "inherit",
}: {
  language: Language;
  tooltip?: string;
  className?: string;
  colored?: boolean;
  color?: string;
}) {
  return (
    <Tooltip className={className} title={tooltip || ""}>
      <Icon className={classes.icon} style={{ fill: color }}>
        {(() => {
          switch (language.toLowerCase() as Language | string) {
            case "ruby":
              return icon("ruby", colored ? "plain" : "original");
            case "python":
              return icon("python", "plain");
            case "javascript":
              return icon("javascript", "plain");
            case "c-plus-plus":
              return icon("cplusplus", "plain");
            case "java":
              return icon("java", "plain");
            case "c":
              return icon("c", "plain");
            case "f-sharp":
              return icon("fsharp", "plain");
            case "go":
              return icon("go", "plain");
            case "rust":
              return icon("rust", "plain");
            case "aarch64_assembly":
              return icon("aarch64", "plain");
            case "c-sharp":
              return icon("csharp", "plain");
            case "dart":
              return icon("dart", "plain");
            case "r":
              return icon("r", "plain");
            case "php":
              return icon("php", "plain");
            case "elixir":
              return icon("elixir", "plain");
            case "kotlin":
              return icon("kotlin", "plain");
            case "scala":
              return icon("scala", "plain");
            case "jupyter":
              return icon("jupyter", "plain");
            case "haskell":
              return icon("haskell", "plain");
            case "ocaml":
              return icon("ocaml", "plain");
            case "swift":
              return icon("swift", "plain");
            case "elm":
              return icon("elm", "plain");
            case "matlab-octave":
              return icon("matlab", "plain");
            default:
              throw new Error(`Missing icon for ${language}`);
          }
        })()}
      </Icon>
    </Tooltip>
  );
}
