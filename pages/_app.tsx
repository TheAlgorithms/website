import React, { Fragment, useEffect, useRef, useState } from "react";
import { CssBaseline, FormControl, OutlinedInput } from "@material-ui/core";
import "../styles/globals.css";
import "devicon/devicon.min.css";
import Jumbo from "../components/jumbo";
import Navbar from "../components/navbar";
import { useRouter } from "next/router";
import { GlobalStateProvider } from "../hooks/globalState";
import SearchBar from "../components/searchBar";
import "nprogress/nprogress.css";
import NProgress from "nprogress";
import Footer from "../components/footer";
import Head from "../components/head";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [query, setQuery] = useState((router.query.q as string) || "");

  const searchBar = (
    <SearchBar small={router.route != "/"} query={query} setQuery={setQuery} />
  );

  useEffect(() => {
    NProgress.configure({
      showSpinner: false,
    });
    router.events.on("routeChangeStart", NProgress.start);
    router.events.on("routeChangeComplete", NProgress.done);
    router.events.on("routeChangeError", NProgress.done);
  }, []);

  return (
    <GlobalStateProvider>
      <Head />
      <CssBaseline />
      <Navbar search={router.route != "/" && searchBar} />
      {router.route == "/" && <Jumbo search={searchBar} />}
      <div style={{ marginTop: "64px" }}>
        <Component {...pageProps} />
      </div>
      <Footer />
    </GlobalStateProvider>
  );
}

export default MyApp;
