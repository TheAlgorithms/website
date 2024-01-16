import { Tooltip, Icon, Theme } from "@material-ui/core";
import React from "react";
import { Language } from "lib/repositories";
import { useTheme } from "@material-ui/styles";
import classes from "./style.module.css";

function icon(name: string, version: string) {
  return (
    <img
      src={`https://rawcdn.githack.com/devicons/devicon/develop/icons/${name}/${name}-${version}.svg`}
      alt={name}
    />
  );
}

export default function LanguageIcon({
  language,
  tooltip,
  className = "",
  color = "inherit",
}: {
  language: Language | string;
  tooltip?: string | JSX.Element;
  className?: string;
  color?: string;
}) {
  const theme: Theme = useTheme();
  const colored = theme?.palette.type !== "dark";

  return (
    <Tooltip className={className} title={tooltip || ""}>
      <Icon className={classes.icon} style={{ fill: color }}>
        {(() => {
          switch (language.toLowerCase() as Language | string) {
            case "ruby":
              return icon("ruby", colored ? "original" : "plain");
            case "python":
              return icon("python", colored ? "original" : "plain");
            case "javascript":
              return icon("javascript", colored ? "original" : "plain");
            case "c-plus-plus":
              return icon("cplusplus", colored ? "original" : "plain");
            case "java":
              return icon("java", colored ? "original" : "plain");
            case "c":
              return icon("c", colored ? "original" : "plain");
            case "f-sharp":
              return icon("fsharp", colored ? "original" : "plain");
            case "go":
              return icon("go", colored ? "original" : "plain");
            case "rust":
              return icon("rust", "original");
            case "aarch64_assembly":
              return icon("aarch64", colored ? "original" : "plain");
            case "c-sharp":
              return icon("csharp", colored ? "original" : "plain");
            case "dart":
              return icon("dart", colored ? "original" : "plain");
            case "r":
              return icon("r", colored ? "original" : "plain");
            case "php":
              return icon("php", colored ? "original" : "plain");
            case "elixir":
              return icon("elixir", colored ? "original" : "plain");
            case "kotlin":
              return icon("kotlin", colored ? "original" : "plain");
            case "scala":
              return icon("scala", colored ? "original" : "plain");
            case "jupyter":
              return icon(
                "jupyter",
                colored ? "original-wordmark" : "plain-wordmark"
              );
            case "haskell":
              return icon("haskell", colored ? "original" : "plain");
            case "ocaml":
              return icon("ocaml", colored ? "original" : "plain");
            case "swift":
              return icon("swift", colored ? "original" : "plain");
            case "elm":
              return icon("elm", colored ? "original" : "plain");
            case "matlab-octave":
              return icon("matlab", colored ? "original" : "plain");
            case "julia":
              return icon("julia", colored ? "original" : "plain");
            case "lua":
              return icon("lua", colored ? "original" : "plain");
            case "typescript":
              return icon("typescript", colored ? "original" : "plain");
            case "zig":
              return icon("zig", colored ? "original" : "original");
            case "nim":
              return icon("nim", colored ? "original" : "original");
            default:
              throw new Error(`Missing icon for ${language}`);
          }
        })()}
      </Icon>
    </Tooltip>
  );
}
