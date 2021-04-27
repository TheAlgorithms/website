import { Tooltip, Icon } from "@material-ui/core";
import React from "react";
import { Language } from "lib/repositories";
import {
  Aarch64PlainIcon,
  CPlainIcon,
  CplusplusPlainIcon,
  CsharpPlainIcon,
  DartPlainIcon,
  ElixirPlainIcon,
  ElmPlainIcon,
  FsharpPlainIcon,
  GoPlainIcon,
  HaskellPlainIcon,
  JavaPlainIcon,
  JavascriptPlainIcon,
  JupyterPlainIcon,
  KotlinPlainIcon,
  MatlabPlainIcon,
  OcamlPlainIcon,
  PhpPlainIcon,
  PythonPlainIcon,
  RPlainIcon,
  RubyPlainIcon,
  RustPlainIcon,
  ScalaPlainIcon,
  SwiftPlainIcon,
} from "react-devicons";
import classes from "./style.module.css";

export default function LanguageIcon({
  language,
  tooltip,
  className = "",
  color = "inherit",
}: {
  language: Language;
  tooltip?: string;
  className?: string;
  color?: string;
}) {
  return (
    <Tooltip className={className} title={tooltip || ""}>
      <Icon className={classes.icon} style={{ fill: color }}>
        {(() => {
          switch (language.toLowerCase() as Language | string) {
            case "ruby":
              return <RubyPlainIcon color="inherit" />;
            case "python":
              return <PythonPlainIcon color="inherit" />;
            case "javascript":
              return <JavascriptPlainIcon color="inherit" />;
            case "c-plus-plus":
              return <CplusplusPlainIcon color="inherit" />;
            case "java":
              return <JavaPlainIcon color="inherit" />;
            case "c":
              return <CPlainIcon color="inherit" />;
            case "f-sharp":
              return <FsharpPlainIcon color="inherit" />;
            case "go":
              return <GoPlainIcon color="inherit" />;
            case "rust":
              return <RustPlainIcon color="inherit" />;
            case "aarch64_assembly":
              return <Aarch64PlainIcon color="inherit" />;
            case "c-sharp":
              return <CsharpPlainIcon color="inherit" />;
            case "dart":
              return <DartPlainIcon color="inherit" />;
            case "r":
              return <RPlainIcon color="inherit" />;
            case "php":
              return <PhpPlainIcon color="inherit" />;
            case "elixir":
              return <ElixirPlainIcon color="inherit" />;
            case "kotlin":
              return <KotlinPlainIcon color="inherit" />;
            case "scala":
              return <ScalaPlainIcon color="inherit" />;
            case "jupyter":
              return <JupyterPlainIcon color="inherit" />;
            case "haskell":
              return <HaskellPlainIcon color="inherit" />;
            case "ocaml":
              return <OcamlPlainIcon color="inherit" />;
            case "swift":
              return <SwiftPlainIcon color="inherit" />;
            case "elm":
              return <ElmPlainIcon color="inherit" />;
            case "matlab-octave":
              return <MatlabPlainIcon color="inherit" />;
            default:
              throw new Error(`Missing icon for ${language}`);
          }
        })()}
      </Icon>
    </Tooltip>
  );
}
