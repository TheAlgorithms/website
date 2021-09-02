import React, { useState } from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import "../styles/globals.css";
import "styles/notebook.css";
import NextNprogress from "nextjs-progressbar";
import { AppProps } from "next/app";
import { lightTheme, darkTheme } from "hooks/themes";
import Head from "components/head";
import { appWithTranslation } from "next-i18next";
import PlausibleScript from "components/plausible";
import { QueryProvider } from "hooks/query";
import { DarkThemeProvider } from "hooks/darkTheme";
import DefaultLayout from "layouts/default";

function MyApp({ Component, pageProps }: AppProps) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Layout = (Component as any).Layout || DefaultLayout;

  return (
    <>
      <DarkThemeProvider value={[isDarkTheme, setIsDarkTheme]}>
        <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
          <QueryProvider>
            <Head />
            <CssBaseline />
            <PlausibleScript />
            <NextNprogress
              color="#fff"
              height={2}
              options={{ showSpinner: false }}
            />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </QueryProvider>
        </ThemeProvider>
      </DarkThemeProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
