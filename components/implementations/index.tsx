import { Tooltip, Typography, useMediaQuery } from "@material-ui/core";
import { Implementation } from "lib/models";
import { Language, getLanguageName } from "lib/repositories";
import LanguageIcon from "components/icon";
import { useTranslation } from "next-i18next";
import Translation from "components/translation";
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
  const { t } = useTranslation();

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
          <div key={language} className={classes.icon}>
            <LanguageIcon
              language={language}
              tooltip={
                <Translation
                  name="langImplementation"
                  variables={{ language: getLanguageName(language) }}
                />
              }
            />
          </div>
        ))}
      {Object.keys(implementations).length > numIcons && (
        <Tooltip
          title={t("languages_count").replace(
            "{}",
            (Object.keys(implementations).length - numIcons).toString()
          )}
        >
          <Typography color="textSecondary" className={classes.more}>
            +{Object.keys(implementations).length - numIcons}
          </Typography>
        </Tooltip>
      )}
    </div>
  );
}
