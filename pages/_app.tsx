import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  CssBaseline,
  FormControl,
  OutlinedInput,
  ThemeProvider,
} from "@material-ui/core";
import "../styles/globals.css";
import "devicon/devicon.min.css";
import Jumbo from "../components/jumbo";
import Navbar from "../components/navbar";
import { useRouter } from "next/router";
import { GlobalStateProvider } from "../hooks/globalState";
import SearchBar from "../components/searchBar";
import "nprogress/nprogress.css";
import NextNprogress from "nextjs-progressbar";
import Footer from "../components/footer";
import Head from "../components/head";
import { lightTheme, darkTheme } from "@/hooks/themes";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [query, setQuery] = useState((router.query.q as string) || "");
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    setIsDarkTheme((localStorage.getItem("theme") || "light") == "dark");
  }, []);

  const searchBar = (
    <SearchBar small={router.route != "/"} query={query} setQuery={setQuery} />
  );

  return (
    <GlobalStateProvider>
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        <Head />
        <CssBaseline />
        <NextNprogress
          color="#fff"
          height={2}
          options={{ showSpinner: false }}
        />
        <Navbar
          search={router.route != "/" && searchBar}
          darkTheme={isDarkTheme}
          setDarkTheme={setIsDarkTheme}
        />
        {router.route == "/" && <Jumbo search={searchBar} />}
        <div style={{ marginTop: "64px" }}>
          <Component {...pageProps} />
        </div>
        <Footer />
      </ThemeProvider>
    </GlobalStateProvider>
  );
}

export default MyApp;
