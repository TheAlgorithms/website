import React, { useEffect, useState } from "react";
import { Button, Icon } from "@material-ui/core";
import { useRouter } from "next/router";
import AlgorithmsList from "components/algorithmsList";
import search from "lib/search";
import Section from "components/section";
import Head from "components/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import classes from "./search.module.css";

export default function Search() {
  const router = useRouter();
  const [limit, setLimit] = useState(27);
  const [loading, setLoading] = useState(false);

  const algorithms = search(router.query.q as string, limit);

  useEffect(() => {
    if (router.query.q) {
      setLimit(27);
    }
  }, [router.query]);

  return (
    <>
      <Head title={router.query.q && `"${router.query.q}"`} />
      <Section title={`Search${router.query.q && ` "${router.query.q}"`}`}>
        {router.query.q && (
          <AlgorithmsList algorithms={algorithms} noCategories />
        )}
        {algorithms.length === limit && (
          <>
            <Button
              disabled={loading}
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setLimit(undefined);
                  setLoading(false);
                });
              }}
              className={classes.more}
              startIcon={<Icon>add</Icon>}
            >
              More
            </Button>
          </>
        )}
      </Section>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
