import { Button, Typography } from "@material-ui/core";
import React from "react";
import NextLink from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import classes from "./404.module.css";

export default function Err404() {
  return (
    <div className={classes.container}>
      <Typography variant="h2">404</Typography>
      <Typography variant="h4">Page not found</Typography>
      <NextLink href="/" passHref>
        <Button variant="contained" color="secondary" className={classes.home}>
          Home
        </Button>
      </NextLink>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
