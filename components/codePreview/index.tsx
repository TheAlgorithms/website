import React, { useState } from "react";
import "highlight.js/styles/atom-one-light.css";
import { Algorithm } from "lib/models";
import {
  Card,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import useTranslation from "hooks/translation";
import { getLanguageName, Language } from "lib/repositories";
import LanguageIcon from "components/icon";
import classes from "./style.module.css";

export default function CodePreview({ algorithm }: { algorithm: Algorithm }) {
  const { implementations } = algorithm;
  const [selectedLanguague, setSelectedLanguague] = useState(
    Object.keys(implementations)[0]
  );
  const t = useTranslation();
  const mobile = useMediaQuery("(max-width: 800px)");

  return (
    <div className={`${classes.container}`}>
      <div className={classes.code}>
        <pre
          className={classes.pre}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: implementations[selectedLanguague].code,
          }}
        />
      </div>
      {mobile ? (
        <FormControl className={classes.mobileImplementations}>
          <InputLabel>Implementation in</InputLabel>
          <Select value={selectedLanguague}>
            {Object.keys(implementations).map((language) => (
              <MenuItem
                value={language}
                onClick={() => setSelectedLanguague(language)}
                key={language}
              >
                <div className={classes.item}>
                  <LanguageIcon language={language} />
                  <Typography>{getLanguageName(language)}</Typography>
                </div>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <div className={classes.implementations}>
          {Object.keys(implementations).map((language: Language) => (
            <Card
              key={language}
              className={
                language === selectedLanguague
                  ? `${classes.card} ${classes.current}`
                  : classes.card
              }
            >
              <IconButton
                className={classes.implementation}
                onClick={() => {
                  if (language !== "jupyter") {
                    setSelectedLanguague(language);
                  }
                }}
                href={
                  language === "jupyter"
                    ? implementations[language].url
                    : undefined
                }
                target="_blank"
                rel="noreferrer"
                aria-label={t("langImplementation", {
                  language: getLanguageName(language),
                })}
              >
                <LanguageIcon language={language} />
              </IconButton>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
