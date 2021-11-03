import React from "react";
import { Typography, Breadcrumbs } from "@material-ui/core";
import Link from "components/link";
import type { Algorithm } from "lib/models";
import { getAlgorithmSlugs, getAlgorithm } from "lib/algorithms";
import { normalize } from "lib/normalize";
import CodePreview from "components/codePreview";
import Head from "components/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPaths, GetStaticProps } from "next";
import Contributors from "components/contributors";
import EditPage from "components/editPage";
import { getLanguageName } from "lib/repositories";
import useTranslation from "hooks/translation";
import classes from "./algorithm.module.css";

export default function AlgorithmPage({
  algorithm,
  locale,
}: {
  algorithm: Algorithm;
  locale: string;
}) {
  const t = useTranslation();

  return (
    <div className="section container">
      <Head
        title={algorithm.name}
        description={t(
          algorithm.body[locale] || algorithm.body.en
            ? "algorithmMetaDescriptionExplained"
            : "algorithmMetaDescription",
          {
            algorithm: algorithm.name,
            implementations: Object.keys(algorithm.implementations)
              .map((key) => getLanguageName(key))
              .join(", "),
          }
        )}
        tags={[
          algorithm.name,
          "Algorithm",
          ...(algorithm.body ? ["Explanation"] : []),
          ...Object.keys(algorithm.implementations).map((key) =>
            getLanguageName(key)
          ),
        ]}
      />
      <Breadcrumbs className={classes.categories}>
        {algorithm.categories.map((category) => (
          <Typography key={category} variant="h6">
            <Link href={`/category/${normalize(category)}`}>
              {t(`categories:${category}`)}
            </Link>
          </Typography>
        ))}
      </Breadcrumbs>
      <Typography variant="h4">{algorithm.name}</Typography>
      <Contributors algorithm={algorithm} />
      <CodePreview algorithm={algorithm} />
      {(algorithm.body[locale] || algorithm.body.en) && (
        <>
          <Typography variant="h5">{t("aboutThisAlgorithm")}</Typography>
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: algorithm.body[locale] || algorithm.body.en || "",
            }}
          />
        </>
      )}
      <EditPage algorithm={algorithm} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => ({
  props: {
    algorithm: await getAlgorithm(params.algorithm.toString()),
    locale,
    ...(await serverSideTranslations(locale, ["common", "categories"])),
  },
});

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: await getAlgorithmSlugs(),
  fallback: false,
});
