import React from "react";
import { Typography, Breadcrumbs, Link as MuiLink } from "@material-ui/core";
import Implementations from "../../components/implementations";
import {
  getAlgorithmSlugs,
  getAlgorithm,
  getAlgorithmCode,
} from "../../lib/algorithms";
import Link from "../../components/link";
import { normalize } from "../../lib/normalize";
import CodePreview from "../../components/codePreview";
import classes from "./algorithm.module.css";
import Head from "../../components/head";
import type { Algorithm } from "@/lib/models";
import renderMarkdown from "@/lib/markdown";

export default function AlgorithmPage({
  algorithm,
  code,
  body,
}: {
  algorithm: Algorithm;
  code: string;
  body: string;
}) {
  return (
    <div className="section container">
      <Head title={algorithm.name} />
      <CodePreview code={code} />
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
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </React.Fragment>
      )}
    </div>
  );
}

export async function getStaticProps({ params }) {
  const algorithm = getAlgorithm(params.slug);
  const code = await getAlgorithmCode(algorithm);
  const body = algorithm.body ? await renderMarkdown(algorithm.body) : "";
  return {
    props: {
      algorithm,
      code,
      body,
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
