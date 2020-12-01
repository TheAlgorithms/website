import React from "react";
import { Typography } from "@material-ui/core";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import SearchBar from "./searchBar";

const useStyles = makeStyles((theme) => ({
  outer: {
    background:
      "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/programming-1873854_1920.png)",
    backgroundSize: "cover",
    color: "white",
    paddingTop: "100px",
    paddingBottom: "50px",
  },
  h1: {
    fontSize: "4em",
    fontWeight: 500,
    marginBottom: "10px",
  },
  h2: {
    fontSize: "2em",
    fontWeight: 300,
    marginBottom: "50px",
  },
  input: {
    width: "400px",
    maxWidth: "100%",
  },
}));

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#fff",
    },
  },
});

export default function Jumbo({ collapsed = true }) {
  let classes = useStyles();

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
