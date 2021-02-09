import React from "react";
import { Typography, Breadcrumbs, Link as MuiLink } from "@material-ui/core";
import Implementations from "../../components/implementations";
import { getAlgorithmSlugs, getAlgorithm } from "../../lib/algorithms.ts";
import Link from "../../components/link";
import { normalize } from "../../lib/normalize";
import { getFileRaw } from "../../lib/github";
import Markdown from "../../components/markdown";
import CodePreview from "../../components/codePreview";
import classes from "./algorithm.module.css";
import Head from "../../components/head";

export default function Algorithm({ algorithm, exampleLanguage, code }) {
  return (
    <div className="section container">
      <Head title={algorithm.name} />
      <CodePreview code={code} language={exampleLanguage} />
      <Breadcrumbs>
        {algorithm.categories.map((category) => (
          <Typography key={category} variant="h6">
            <Link href={`/category/${normalize(category)}`}>{category}</Link>
          </Typography>
        ))}
      </Breadcrumbs>
      <Typography variant="h4">{algorithm.name}</Typography>
      <Typography variant="h5" className={classes.titleSmall}>
        Implementations
      </Typography>
      <Implementations implementations={algorithm.implementations} large />
      {algorithm.body && (
        <React.Fragment>
          <Typography variant="h5" className={classes.titleSmall}>
            Explanation
          </Typography>
          <Markdown>{algorithm.body}</Markdown>
        </React.Fragment>
      )}
    </div>
  );
}

export async function getStaticProps({ params }) {
  const algorithm = getAlgorithm(params.slug);
  const exampleLanguage = Object.keys(algorithm.implementations)[0];
  const code = await (
    await fetch(
      encodeURI(getFileRaw(algorithm.implementations[exampleLanguage]))
    )
  ).text();
  return {
    props: {
      algorithm,
      exampleLanguage,
      code,
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
