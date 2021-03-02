import React from "react";
import { Paper, Typography, useTheme } from "@material-ui/core";
import { JumboThemeProvider } from "hooks/themes";
import Image from "next/image";
import SearchBar from "components/searchBar";
import classes from "./style.module.css";

export default function Jumbo({
  query,
  setQuery,
}: {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
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
            <Image
              src="/programming-1873854.webp"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="container">
            <Typography className={classes.h1}>Hello, algorithms!</Typography>
            <Typography className={classes.h2}>
              Welcome to GitHub's largest open-source algorithm library
            </Typography>
            <div className={classes.input}>
              <SearchBar query={query} setQuery={setQuery} />
            </div>
          </div>
        </div>
      </JumboThemeProvider>
    </Paper>
  );
}
