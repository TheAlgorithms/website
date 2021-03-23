import React, { useEffect } from "react";
import { Typography, Breadcrumbs } from "@material-ui/core";
import Link from "components/link";
import renderMarkdown from "lib/markdown";
import renderNotebook from "lib/notebookjs";
import type { Algorithm, Language } from "lib/models";
import {
  getAlgorithmSlugs,
  getAlgorithm,
  getAlgorithmCode,
} from "lib/algorithms";
import { normalize } from "lib/normalize";
import CodePreview from "components/codePreview";
import Head from "components/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import classes from "./algorithm.module.css";

export default function AlgorithmPage({
  algorithm,
  code,
  body,
  jupyter,
  locale,
}: {
  algorithm: Algorithm;
  code: { [language in Language]?: string };
  body: { [locale: string]: string };
  jupyter?: string;
  locale: string;
}) {
  useEffect(() => {
    if (jupyter) {
      import("katex/dist/katex.min.js");
      // import("katex/dist/katex.min.css");
      import("katex/contrib/auto-render/auto-render");
    }
  }, [jupyter]);

  return (
    <div className="section container">
      <Head title={algorithm.name} />
      <CodePreview code={code} implementations={algorithm.implementations} />
      <Breadcrumbs className={classes.categories}>
        {algorithm.categories.map((category) => (
          <Typography key={category} variant="h6">
            <Link href={`/category/${normalize(category)}`}>{category}</Link>
          </Typography>
        ))}
      </Breadcrumbs>
      <Typography variant="h4">{algorithm.name}</Typography>
      {jupyter && (
        <div
          className={classes.notebook}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: jupyter }}
        />
      )}
      {body && (
        <>
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              // eslint-disable-next-line react/no-danger
              // eslint-disable-next-line no-nested-ternary
              __html: body[locale] ? body[locale] : body.en ? body.en : "",
            }}
          />
        </>
      )}
    </div>
  );
}

export async function getStaticProps({ params, locale }) {
  const algorithm = getAlgorithm(params.algorithm);
  const code = await getAlgorithmCode(algorithm);
  // eslint-disable-next-line no-unused-expressions
  const body = {};
  await Promise.all(
    Object.keys(algorithm.body).map(async (explLocale) => {
      body[explLocale] = await renderMarkdown(algorithm.body[explLocale]);
    })
  );
  const jupyter = algorithm.implementations.jupyter
    ? await renderNotebook(algorithm)
    : "";
  return {
    props: {
      algorithm,
      code,
      body,
      jupyter,
      locale,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export async function getStaticPaths() {
  const paths = getAlgorithmSlugs();
  return {
    paths,
    fallback: false,
  };
}
