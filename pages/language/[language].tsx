import React from "react";
import { Typography, Breadcrumbs } from "@material-ui/core";
import AlgorithmsList from "../../components/algorithmsList";
import { getCategories, getCategory } from "../../lib/categories";
import Section from "../../components/section";
import Head from "../../components/head";
import { getLanguage, getLanguages } from "../../lib/languages";

export default function Language({ language }) {
  return (
    <React.Fragment>
      <Head title={language.name} />
      <Section title={language.name}>
        <AlgorithmsList algorithms={language.algorithms} />
      </Section>
    </React.Fragment>
  );
}

export async function getStaticProps({ params }) {
  const language = getLanguage(params.language);
  return {
    props: {
      language,
    },
  };
}

export async function getStaticPaths() {
  const paths = getLanguages();
  return {
    paths,
    fallback: false,
  };
}
