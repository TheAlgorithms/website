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

function getIcon(language) {
  const icon = (language, className) => (
    <Tooltip title={`${language} Implementation`}>
      <Icon color="disabled" className={className} />
    </Tooltip>
  );

  switch (language) {
    case "python":
      return icon("Python", "devicon-python-plain");
    case "java":
      return icon("Java", "devicon-java-plain");
    case "javascript":
      return icon("Javascript", "devicon-javascript-plain");
    case "c":
      return icon("C", "devicon-c-plain");
    case "go":
      return icon("GO", "devicon-go-plain");
    case "c-plus-plus":
      return icon("C++", "devicon-cplusplus-plain");
  }
}
