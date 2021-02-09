import React from "react";
import { Paper, Typography } from "@material-ui/core";
import SearchBar from "../searchBar";
import classes from "./style.module.css";
import DarkThemeProvider from "../darkThemeProvider";

export default function Jumbo({ search }) {
  return (
    <Paper>
      <DarkThemeProvider>
        <div className={classes.outer}>
          <div className="container">
            <Typography className={classes.h1}>Hello, algorithms!</Typography>
            <Typography className={classes.h2}>
              Welcome to GitHub's largest open-source algorithm library
            </Typography>
            <div className={classes.input}>{search}</div>
          </div>
        </div>
      </DarkThemeProvider>
    </Paper>
  );
}
