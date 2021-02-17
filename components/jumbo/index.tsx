import React from "react";
import { Paper, Typography, useTheme } from "@material-ui/core";
import { JumboThemeProvider } from "hooks/themes";
import classes from "./style.module.css";

export default function Jumbo({ search }) {
  const theme = useTheme();

  return (
    <Paper>
      <JumboThemeProvider>
        <div
          className={classes.outer}
          style={{
            background:
              theme.palette.type === "dark"
                ? `linear-gradient(${theme.palette.background.paper}, ${theme.palette.background.paper}C0),url(/programming-1873854_1920.webp)`
                : "linear-gradient(#3a4852, #3a4852b7),url(/programming-1873854_1920.webp)",
          }}
        >
          <div className="container">
            <Typography className={classes.h1}>Hello, algorithms!</Typography>
            <Typography className={classes.h2}>
              Welcome to GitHub's largest open-source algorithm library
            </Typography>
            <div className={classes.input}>{search}</div>
          </div>
        </div>
      </JumboThemeProvider>
    </Paper>
  );
}
