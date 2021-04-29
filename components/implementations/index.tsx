import { Tooltip, Typography, useMediaQuery } from "@material-ui/core";
import { Implementation } from "lib/models";
import { Language, getLanguageName } from "lib/repositories";
import LanguageIcon from "components/icon";
import LanguagesList from "../languagesList";
import classes from "./style.module.css";

export default function Implementations({
  implementations,
  large = false,
  className,
}: {
  implementations: { [key in Language]?: Implementation };
  large?: boolean;
  className?: string;
}) {
  const smallWidth = useMediaQuery(
    "(max-width: 1200px) and (min-width: 700px)"
  );
  const numIcons = smallWidth ? 4 : 6;

  return large ? (
    <LanguagesList
      languages={Object.keys(implementations).map((langName: Language) => ({
        name: langName,
        href: implementations[langName].url,
      }))}
      className={className || ""}
    />
  ) : (
    <div className={classes.rootSmall}>
      {Object.keys(implementations)
        .slice(0, numIcons)
        .map((language: Language) => (
          <a
            key={language}
            href={implementations[language].url}
            className={classes.icon}
          >
            <LanguageIcon
              language={language}
              tooltip={`${getLanguageName(language)} Implementation`}
            />
          </a>
        ))}
      {Object.keys(implementations).length > numIcons && (
        <Tooltip
          title={`And ${Object.keys(implementations).length - numIcons} more`}
        >
          <Typography color="textSecondary" className={classes.more}>
            +{Object.keys(implementations).length - numIcons}
          </Typography>
        </Tooltip>
      )}
    </div>
  );
}
