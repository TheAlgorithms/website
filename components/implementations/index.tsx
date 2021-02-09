import { Box, Button, Icon, Tooltip, Typography } from "@material-ui/core";
import classes from "./style.module.css";

export default function Implementations({ implementations, large = false }) {
  return large ? (
    <div className={classes.rootLarge}>
      {Object.keys(implementations).map((language) => (
        <a
          key={language}
          href={implementations[language]}
          className={classes.button}
        >
          <Button variant="outlined" startIcon={getIcon(language)}>
            {language}
          </Button>
        </a>
      ))}
    </div>
  ) : (
    <div className={classes.rootSmall}>
      {Object.keys(implementations).map((language) => (
        <a
          key={language}
          href={implementations[language]}
          className={classes.icon}
        >
          {getIcon(language)}
        </a>
      ))}
    </div>
  );
}

function getIcon(language: string) {
  const icon = (language: string, className: string) => (
    <Tooltip title={`${language} Implementation`}>
      <Icon color="disabled" className={className} />
    </Tooltip>
  );

  const textIcon = (language: string, text: string) => (
    <Tooltip title={`${language} Implementation`}>
      <Typography className={classes.textIcon}>{text}</Typography>
    </Tooltip>
  );

  switch (language) {
    case "Ruby":
      return icon("Ruby", "devicon-ruby-plain");
    case "Python":
      return icon("Python", "devicon-python-plain");
    case "Javascript":
      return icon("Javascript", "devicon-javascript-plain");
    case "C-Plus-Plus":
      return icon("C++", "devicon-cplusplus-plain");
    case "Java":
      return icon("Java", "devicon-java-plain");
    case "C":
      return icon("C", "devicon-c-plain");
    case "F-Sharp":
      return textIcon("F#", "F#");
    case "Go":
      return icon("Go", "devicon-go-plain");
    case "Rust":
      return icon("Rust", "devicon-rust-plain");
    case "AArch64_Assembly":
      return textIcon("AArch64 Assembly", "A64");
    case "C-Sharp":
      return icon("C#", "devicon-csharp-plain");
    case "Dart":
      return icon("Dart", "devicon-flutter-plain");
    case "R":
      return textIcon("R", "R");
    case "PHP":
      return icon("PHP", "devicon-php-plain");
    case "Elixir":
      return textIcon("Elixir", "El");
    case "Kotlin":
      return icon("Kotlin", "devicon-kotlin-plain");
    case "Scala":
      return icon("Scala", "devicon-scala-plain");
    case "Jupyter":
      return textIcon("Jupyter", "J");
    case "Haskell":
      return icon("Haskell", "devicon-haskell-plain");
    case "OCaml":
      return textIcon("OCaml", "OC");
    case "Swift":
      return icon("Swift", "devicon-swift-plain");
    case "Elm":
      return icon("Elm", "devicon-elm-plain");
    case "MATLAB-Octave":
      return textIcon("MATLAB Octave", "MLO");
  }
}
