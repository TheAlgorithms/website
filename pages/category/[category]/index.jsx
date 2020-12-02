import React from "react";
import { Typography, Breadcrumbs } from "@material-ui/core";
import AlgorithmsList from "../../../components/algorithmsList";
import { getCategories, getCategory } from "../../../lib/categories";
import Section from "../../../components/section";
import Head from "next/head";

export default function Category({ category }) {
  return (
    <React.Fragment>
      <Head>
        <title>{category.name} - TheAlgorithms</title>
      </Head>
      <Section title={category.name}>
        <AlgorithmsList algorithms={category.algorithms} />
      </Section>
    </React.Fragment>
  );
}

export async function getStaticProps({ params }) {
  const category = getCategory(params.category);
  return {
    props: {
      category,
    },
  };
}

export async function getStaticPaths() {
  const paths = getCategories();
  return {
    paths,
    fallback: false,
  };
}
