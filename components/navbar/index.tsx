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
  useTheme,
} from "@material-ui/core";
import Link from "../link";
import React from "react";
import classes from "./style.module.css";
import SearchBar from "../searchBar";
import NextLink from "next/link";
import { JumboThemeProvider } from "@/hooks/themes";

export default function Navbar({ search, darkTheme, setDarkTheme }) {
  const [atTop, setAtTop] = useState(false);
  const hasMenuButton = useMediaQuery("(max-width:600px)");
  const [menuAnchor, setMenuAnchor] = useState<HTMLButtonElement>();
  const theme = useTheme();

  useEffect(() => {
    setAtTop(window.scrollY < 1);
    window.addEventListener("scroll", (event) => {
      setAtTop(window.scrollY < 1);
    });
  }, []);

  function switchTheme() {
    setDarkTheme((darkTheme) => {
      localStorage.setItem("theme", darkTheme ? "light" : "dark");
      return !darkTheme;
    });
  }

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
    {
      name: "Twitter",
      href: "https://twitter.com/The_Algorithms/",
    },
  ];

  return (
    <AppBar
      className={
        atTop && !search ? classes.root : `${classes.root} ${classes.scrolled}`
      }
      position="fixed"
    >
      <div
        className={classes.background}
        style={{
          background: darkTheme ? theme.palette.background.paper : "#3a4852",
        }}
      />
      <JumboThemeProvider>
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
              <IconButton onClick={switchTheme}>
                {darkTheme ? <Icon>light_mode</Icon> : <Icon>dark_mode</Icon>}
              </IconButton>
              {menu.map((item, index) => (
                <NextLink passHref key={index} href={item.href}>
                  <Button>{item.name}</Button>
                </NextLink>
              ))}
            </div>
          )}
        </Toolbar>
      </JumboThemeProvider>
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
        <MenuItem onClick={switchTheme}>
          {darkTheme ? "Light mode" : "Dark mode"}
        </MenuItem>
      </Menu>
    </AppBar>
  );
}
