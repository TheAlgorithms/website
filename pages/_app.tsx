import React from "react";
import { CssBaseline } from "@material-ui/core";
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

  const searchBar = <SearchBar small={router.route != "/"} />;

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
