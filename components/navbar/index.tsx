import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "next-i18next";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  useMediaQuery,
  IconButton,
  Icon,
  MenuItem,
  SwipeableDrawer,
  ListItem,
} from "@material-ui/core";
import NextLink from "next/link";
import { JumboThemeProvider } from "hooks/themes";
import Link from "components/link";
import { useRouter } from "next/router";
import SearchBar from "components/searchBar";
import LangSelect from "components/langSelect";
import classes from "./style.module.css";

export default function Navbar({
  darkTheme,
  setDarkTheme,
  query,
  setQuery,
}: {
  darkTheme: boolean;
  setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { t } = useTranslation("common");
  const [atTop, setAtTop] = useState(false);
  const smallScreen = useMediaQuery("(max-width:800px)");
  const [menuOpen, setMenuOpen] = useState(false);
  const langSelectRef = useRef();
  const [langSelectOpen, setLangSelectOpen] = useState(false);
  const router = useRouter();
  const isHome = router.route === "/";

  const menu = [
    {
      name: t("aboutTextNavbar"),
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

  useEffect(() => {
    setAtTop(window.scrollY < 1);
    window.addEventListener("scroll", () => {
      setAtTop(window.scrollY < 1);
    });
  }, []);

  function switchTheme() {
    setDarkTheme((currentDarkTheme: boolean) => {
      localStorage.setItem("theme", currentDarkTheme ? "light" : "dark");
      return !darkTheme;
    });
  }

  return (
    <AppBar
      className={
        !menuOpen && atTop && isHome
          ? classes.root
          : `${classes.root} ${classes.scrolled}`
      }
      position="fixed"
    >
      <JumboThemeProvider>
        <Toolbar className={`${classes.toolbar} container`}>
          <Link href="/" style={{ color: "white" }}>
            <Typography variant="h6" className={classes.title}>
              <img src="/logo_t.svg" alt="The Algorithms logo" />
              TheAlgorithms
            </Typography>
          </Link>
          {!isHome && !smallScreen && (
            <SearchBar query={query} setQuery={setQuery} small />
          )}
          {smallScreen ? (
            <>
              <IconButton
                onClick={() => setMenuOpen((isMenuOpen) => !isMenuOpen)}
              >
                <Icon>{menuOpen ? "close" : "menu"}</Icon>
              </IconButton>
            </>
          ) : (
            <div>
              <IconButton
                ref={langSelectRef}
                onClick={() => setLangSelectOpen(true)}
              >
                <Icon>translate</Icon>
              </IconButton>
              <IconButton onClick={switchTheme}>
                {darkTheme ? <Icon>light_mode</Icon> : <Icon>dark_mode</Icon>}
              </IconButton>
              {menu.map((item) => (
                <NextLink passHref key={item.name} href={item.href}>
                  <Button>{item.name}</Button>
                </NextLink>
              ))}
            </div>
          )}
        </Toolbar>
        <SwipeableDrawer
          onOpen={() => setMenuOpen(true)}
          onClose={() => setMenuOpen(false)}
          open={menuOpen && smallScreen}
          anchor="right"
          classes={{
            paper: darkTheme ? classes.drawerDark : classes.drawer,
          }}
        >
          <ListItem className={classes.drawerSearch}>
            <SearchBar query={query} setQuery={setQuery} small />
          </ListItem>
          {menu.map((item) => (
            <NextLink key={item.name} href={item.href}>
              <MenuItem>{item.name}</MenuItem>
            </NextLink>
          ))}
          <MenuItem onClick={switchTheme}>
            {darkTheme ? t("lightModeNavbar") : t("darkModeNavbar")}
          </MenuItem>
          <MenuItem onClick={() => setLangSelectOpen(true)}>
            {t("changeLanguageNavbar")}
          </MenuItem>
        </SwipeableDrawer>
        <LangSelect
          open={langSelectOpen}
          onClose={() => setLangSelectOpen(false)}
          anchor={langSelectRef.current}
        />
      </JumboThemeProvider>
    </AppBar>
  );
}
