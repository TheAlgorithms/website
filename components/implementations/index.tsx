import { Box, Button, Icon, Tooltip, Typography } from "@material-ui/core";
import { Language, getLanguageName } from "../../lib/models";
import LanguageIcon from "../icon";
import LanguagesList from "../languagesList";
import classes from "./style.module.css";

export default function Implementations({ implementations, large = false }) {
  return large ? (
    <LanguagesList
      languages={Object.keys(implementations).map((langName: Language) => ({
        name: langName,
        href: implementations[langName],
      }))}
    />
  ) : (
    <div className={classes.rootSmall}>
      {Object.keys(implementations)
        .slice(0, 6)
        .map((language: Language) => (
          <a
            key={language}
            href={implementations[language]}
            className={classes.icon}
          >
            <LanguageIcon
              language={language}
              tooltip={`${getLanguageName(language)} Implementation`}
            />
          </a>
        ))}
      {Object.keys(implementations).length > 6 && (
        <Typography color="textSecondary" className={classes.more}>
          +{Object.keys(implementations).length - 6}
        </Typography>
      )}
    </div>
  );
}
