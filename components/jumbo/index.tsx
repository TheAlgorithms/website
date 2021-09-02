import React from "react";
import { Paper, Typography, useTheme } from "@material-ui/core";
import { JumboThemeProvider } from "hooks/themes";
import SearchBar from "components/searchBar";
import useTranslation from "hooks/translation";
import { useQuery } from "hooks/query";
import classes from "./style.module.css";

export default function Jumbo() {
  const t = useTranslation();
  const [query, setQuery] = useQuery();
  const theme = useTheme();

  return (
    <Paper className={classes.paper}>
      <JumboThemeProvider>
        <div
          className={classes.outer}
          style={{
            background:
              theme?.palette.type === "dark"
                ? `linear-gradient(${theme?.palette.background.paper}, ${theme?.palette.background.paper}C0)`
                : "linear-gradient(#3a4852, #3a4852b7)",
          }}
        >
          <div className={classes.background}>
            <img
              src="/background1.svg"
              className={classes.background1}
              aria-hidden
              alt=""
            />
            <img
              src="/background2.svg"
              className={classes.background2}
              aria-hidden
              alt=""
            />
            <img
              src="/background3.svg"
              className={classes.background3}
              aria-hidden
              alt=""
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
