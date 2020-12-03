import { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import Link from "../link";
import React from "react";
import classes from "./style.module.css";
import SearchBar from "../searchBar";
import DarkThemeProvider from "../darkThemeProvider";

export default function Navbar({ search = true }) {
  return (
    <AppBar className={classes.root} position="sticky">
      <DarkThemeProvider>
        <Toolbar className={classes.toolbar + " container"}>
          <Typography variant="h6" className={classes.title}>
            <Link href="/" style={{ color: "white" }}>
              TheAlgorithms
            </Link>
          </Typography>

          {search && <SearchBar small />}
          <Button
            color="inherit"
            href="https://github.com/TheAlgorithms/"
            target="_blank"
          >
            GitHub
          </Button>
        </Toolbar>
      </DarkThemeProvider>
    </AppBar>
  );
}
