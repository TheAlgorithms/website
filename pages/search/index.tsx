import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { useRouter } from "next/router";
import AlgorithmsList from "components/algorithmsList";
import useSearch from "hooks/search";
import Section from "components/section";
import Head from "components/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Add } from "@material-ui/icons";
import useTranslation from "hooks/translation";
import { GetStaticProps } from "next";
import classes from "./search.module.css";

export default function Search() {
  const router = useRouter();
  const [limit, setLimit] = useState(27);
  const [loading, setLoading] = useState(false);
  const t = useTranslation();

  const algorithms = useSearch(router.query.q as string, limit);
  let sectionTitle = "";
  if (algorithms.length !== 0) {
    sectionTitle = `${t("search")} "${router.query.q}"`;
  } else if (algorithms.length === 0 && router.query.q) {
    sectionTitle = `${t("noResults")} "${router.query.q}"`;
  } else {
    sectionTitle = t("emptySearch");
  }

  useEffect(() => {
    if (router.query.q) {
      setLimit(27);
    }
  }, [router.query]);

  return (
    <>
      <Head title={router.query.q && `"${router.query.q}"`} />
      <Section title={sectionTitle}>
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
              startIcon={<Add />}
            >
              {t("moreAlgorithmCard")}
            </Button>
          </>
        )}
      </Section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "categories"])),
  },
});
