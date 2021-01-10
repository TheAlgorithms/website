import React, { Fragment, useEffect, useRef, useState } from "react";
import { CssBaseline, FormControl, OutlinedInput } from "@material-ui/core";
import "../styles/globals.css";
import "devicon/devicon.min.css";
import Jumbo from "../components/jumbo";
import Navbar from "../components/navbar";
import Head from "next/head";
import { useRouter } from "next/router";
import { GlobalStateProvider } from "../hooks/globalState";
import SearchBar from "../components/searchBar";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [query, setQuery] = useState(router.query.q as string);

  const searchBar = (
    <SearchBar small={router.route != "/"} query={query} setQuery={setQuery} />
  );

  return (
    <GlobalStateProvider>
      <Head>
        <title>TheAlgorithms</title>
      </Head>
      <CssBaseline />
      <Navbar search={router.route != "/" && searchBar} />
      {router.route == "/" && <Jumbo search={searchBar} />}
      <Component {...pageProps} />
    </GlobalStateProvider>
  );
}

export default MyApp;
