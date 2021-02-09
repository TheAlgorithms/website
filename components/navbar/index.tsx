import { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import Link from "../link";
import React from "react";
import classes from "./style.module.css";
import SearchBar from "../searchBar";
import DarkThemeProvider from "../darkThemeProvider";
import NextLink from "next/link";

export default function Navbar({ search }) {
  const [atTop, setAtTop] = useState(false);

  useEffect(() => {
    setAtTop(window.scrollY < 1);
    window.addEventListener("scroll", (event) => {
      setAtTop(window.scrollY < 1);
    });
  }, []);

  return (
    <AppBar
      className={
        atTop && !search ? classes.root : `${classes.root} ${classes.scrolled}`
      }
      position="fixed"
    >
      <div className={classes.background} />
      <DarkThemeProvider>
        <Toolbar className={classes.toolbar + " container"}>
          <Link href="/" style={{ color: "white" }}>
            <Typography variant="h6" className={classes.title}>
              <img src="/logo_t.png" />
              TheAlgorithms
            </Typography>
          </Link>
          {search && search}
          <div>
            <NextLink href="/#about">
              <Button color="inherit">About</Button>
            </NextLink>
            <Button color="inherit" href="https://gitter.im/TheAlgorithms/">
              Gitter
            </Button>
            <Button color="inherit" href="https://github.com/TheAlgorithms/">
              GitHub
            </Button>
          </div>
        </Toolbar>
      </DarkThemeProvider>
    </AppBar>
  );
}
