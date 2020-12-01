import React from "react";
import { CssBaseline } from "@material-ui/core";
import "../styles/globals.css";
import "devicon/devicon.min.css";
import Jumbo from "../components/jumbo";
import Navbar from "../components/navbar";
import Head from "next/head";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <React.Fragment>
      <Head>
        <title>TheAlgorithms</title>
      </Head>
      <CssBaseline />
      <Navbar />
      <Jumbo collapsed={router.route != "/"} />
      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default MyApp;
