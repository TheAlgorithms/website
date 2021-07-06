import React, { useEffect, useState } from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import "../styles/globals.css";
import "styles/notebook.css";
import { useRouter } from "next/router";
import NextNprogress from "nextjs-progressbar";
import { AppProps } from "next/app";
import { lightTheme, darkTheme } from "hooks/themes";
import Jumbo from "components/jumbo";
import Navbar from "components/navbar";
import Footer from "components/footer";
import Head from "components/head";
import { appWithTranslation } from "next-i18next";
import PlausibleScript from "components/plausible";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [query, setQuery] = useState((router.query.q as string) || "");
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    setIsDarkTheme(
      localStorage.getItem("theme")
        ? localStorage.getItem("theme") === "dark"
        : window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }, []);

  useEffect(() => {
    if (isDarkTheme) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  }, [isDarkTheme]);

  return (
    <>
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        <Head />
        <CssBaseline />
        <PlausibleScript />
        <NextNprogress
          color="#fff"
          height={2}
          options={{ showSpinner: false }}
        />
        <Navbar
          darkTheme={isDarkTheme}
          setDarkTheme={setIsDarkTheme}
          query={query}
          setQuery={setQuery}
        />
        {router.route === "/" && <Jumbo query={query} setQuery={setQuery} />}
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
