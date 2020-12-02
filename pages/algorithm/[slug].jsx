import React from "react";
import { Typography, Breadcrumbs, Link as MuiLink } from "@material-ui/core";
import Implementations from "../../components/implementations";
import { getAlgorithmSlugs, getAlgorithm } from "../../lib/algorithms.ts";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import Link from "../../components/link";
import { normalize } from "../../lib/normalize";
import { getFileRaw } from "../../lib/github";
import Markdown from "../../components/markdown";
import CodePreview from "../../components/codePreview";

const useStyles = makeStyles((theme) => ({
  titleSmall: {
    marginTop: "2em",
    marginBottom: "0.5em",
  },
}));

export default function Algorithm({ algorithm, exampleLanguage, code }) {
  let classes = useStyles();

  return (
    <div className="section container">
      <Head>
        <title>{algorithm.name} - TheAlgorithms</title>
      </Head>
      <CodePreview code={code} language={exampleLanguage} />
      <Breadcrumbs>
        <Typography variant="h6">
          <Link href={`/category/${normalize(algorithm.category)}`}>
            {algorithm.category}
          </Link>
        </Typography>
        {algorithm.subCategory && (
          <Typography variant="h6">
            <Link
              href={`/category/${normalize(algorithm.category)}/${normalize(
                algorithm.subCategory
              )}`}
            >
              {algorithm.subCategory}
            </Link>
          </Typography>
        )}
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
