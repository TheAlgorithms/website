import { Tooltip, Icon } from "@material-ui/core";
import React from "react";
import { Language } from "lib/models";
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

export default function LanguageIcon({
  language,
  tooltip,
  className = "",
  color = "rgba(0, 0, 0, 0.26)",
}: {
  language: Language;
  tooltip?: string;
  className?: string;
  color?: string;
}) {
  return (
    <Tooltip className={className} title={tooltip || ""}>
      <Icon>
        {(() => {
          switch (language.toLowerCase() as Language | string) {
            case "ruby":
              return <RubyPlainIcon color={color} />;
            case "python":
              return <PythonPlainIcon color={color} />;
            case "javascript":
              return <JavascriptPlainIcon color={color} />;
            case "c-plus-plus":
              return <CplusplusPlainIcon color={color} />;
            case "java":
              return <JavaPlainIcon color={color} />;
            case "c":
              return <CPlainIcon color={color} />;
            case "f-sharp":
              return <FsharpPlainIcon color={color} />;
            case "go":
              return <GoPlainIcon color={color} />;
            case "rust":
              return <RustPlainIcon color={color} />;
            case "aarch64_assembly":
              return <Aarch64PlainIcon color={color} />;
            case "c-sharp":
              return <CsharpPlainIcon color={color} />;
            case "dart":
              return <DartPlainIcon color={color} />;
            case "r":
              return <RPlainIcon color={color} />;
            case "php":
              return <PhpPlainIcon color={color} />;
            case "elixir":
              return <ElixirPlainIcon color={color} />;
            case "kotlin":
              return <KotlinPlainIcon color={color} />;
            case "scala":
              return <ScalaPlainIcon color={color} />;
            case "jupyter":
              return <JupyterPlainIcon color={color} />;
            case "haskell":
              return <HaskellPlainIcon color={color} />;
            case "ocaml":
              return <OcamlPlainIcon color={color} />;
            case "swift":
              return <SwiftPlainIcon color={color} />;
            case "elm":
              return <ElmPlainIcon color={color} />;
            case "matlab-octave":
              return <MatlabPlainIcon color={color} />;
            default:
              throw new Error(`Missing icon for ${language}`);
          }
        })()}
      </Icon>
    </Tooltip>
  );
}
