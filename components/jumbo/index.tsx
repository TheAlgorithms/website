import React from "react";
import { Paper, Typography, useTheme } from "@material-ui/core";
import { JumboThemeProvider } from "hooks/themes";
import SearchBar from "components/searchBar";
import useTranslation from "hooks/translation";
import classes from "./style.module.css";
import "highlight.js/styles/atom-one-light.css";
import { background1, background2, background3 } from "./renderedBackgrounds";

export default function Jumbo({
  query,
  setQuery,
}: {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  const t = useTranslation();
  const theme = useTheme();

  return (
    <Paper className={classes.paper}>
      <JumboThemeProvider>
        <div
          className={classes.outer}
          style={{
            background:
              theme.palette.type === "dark"
                ? `linear-gradient(${theme.palette.background.paper}, ${theme.palette.background.paper}C0)`
                : "linear-gradient(#3a4852, #3a4852b7)",
          }}
        >
          <div className={classes.background}>
            <div
              className={classes.background1}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: background1,
              }}
            />
            <div
              className={classes.background2}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: background2,
              }}
            />
            <div
              className={classes.background3}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: background3,
              }}
            />
          </div>
          <div className="container">
            <Typography className={classes.h1}>
              {t("helloAlgorithms")}
            </Typography>
            <Typography className={classes.h2}>{t("welcomeTitle")}</Typography>
            <div className={classes.input}>
              <SearchBar query={query} setQuery={setQuery} />
            </div>
          </div>
        </div>
      </JumboThemeProvider>
    </Paper>
  );
}
