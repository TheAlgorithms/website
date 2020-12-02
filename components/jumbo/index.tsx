import React from "react";
import { Typography } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import SearchBar from "../searchBar";
import classes from "./style.module.css";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#fff",
    },
  },
});

export default function Jumbo({ collapsed = true }) {
  return (
    <div className={classes.outer}>
      <div className="container">
        {!collapsed && (
          <React.Fragment>
            <Typography className={classes.h1}>Hello, algorithms!</Typography>
            <Typography className={classes.h2}>
              Welcome to GitHub's largest open-source algorithm library
            </Typography>
          </React.Fragment>
        )}
        <ThemeProvider theme={darkTheme}>
          <div className={classes.input}>
            <SearchBar />
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
}
