import React from "react";
import { CssBaseline } from "@material-ui/core";
import "../styles/globals.css";
import "devicon/devicon.min.css";
import Jumbo from "../components/jumbo";
import Navbar from "../components/navbar";
import Head from "next/head";
import { useRouter } from "next/router";
import { GlobalStateProvider } from "../hooks/globalState";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <GlobalStateProvider>
      <Head>
        <title>TheAlgorithms</title>
      </Head>
      <CssBaseline />
      <Navbar search={router.route != "/"} />
      {router.route == "/" && <Jumbo />}
      <Component {...pageProps} />
    </GlobalStateProvider>
  );
}

export default MyApp;
