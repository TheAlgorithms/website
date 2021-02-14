import { useState, useEffect, Fragment } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  useMediaQuery,
  IconButton,
  Icon,
  Menu,
  MenuItem,
} from "@material-ui/core";
import Link from "../link";
import React from "react";
import classes from "./style.module.css";
import SearchBar from "../searchBar";
import DarkThemeProvider from "../darkThemeProvider";
import NextLink from "next/link";

export default function Navbar({ search }) {
  const [atTop, setAtTop] = useState(false);
  const hasMenuButton = useMediaQuery("(max-width:600px)");
  const [menuAnchor, setMenuAnchor] = useState<HTMLButtonElement>();

  useEffect(() => {
    setAtTop(window.scrollY < 1);
    window.addEventListener("scroll", (event) => {
      setAtTop(window.scrollY < 1);
    });
  }, []);

  const menu = [
    {
      name: "About",
      href: "/#about",
    },
    {
      name: "Gitter",
      href: "https://gitter.im/TheAlgorithms/",
    },
    {
      name: "GitHub",
      href: "https://github.com/TheAlgorithms/",
    },
  ];

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
          {hasMenuButton ? (
            <Fragment>
              <IconButton
                onClick={(event) => setMenuAnchor(event.currentTarget)}
              >
                <Icon>menu</Icon>
              </IconButton>
            </Fragment>
          ) : (
            <div>
              {menu.map((item, index) => (
                <NextLink passHref key={index} href={item.href}>
                  <Button color="inherit">{item.name}</Button>
                </NextLink>
              ))}
            </div>
          )}
        </Toolbar>
      </DarkThemeProvider>
      <Menu
        anchorEl={menuAnchor}
        onClose={() => setMenuAnchor(null)}
        open={!!menuAnchor}
      >
        {menu.map((item, index) => (
          <NextLink key={index} href={item.href}>
            <MenuItem>{item.name}</MenuItem>
          </NextLink>
        ))}
      </Menu>
    </AppBar>
  );
}
