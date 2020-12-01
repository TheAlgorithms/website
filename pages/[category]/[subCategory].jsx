import React from "react";
import { Typography, Breadcrumbs } from "@material-ui/core";
import AlgorithmsList from "../../components/algorithmsList";
import { getSubCategories, getSubCategory } from "../../lib/subcategories.ts";
import Section from "../../components/section";
import Head from "next/head";

export default function SubCategory({ subCategory }) {
  return (
    <React.Fragment>
      <Head>
        <title>
          {subCategory.category} / {subCategory.name} - TheAlgorithms
        </title>
      </Head>
      <Section title={`${subCategory.category} / ${subCategory.name}`}>
        <AlgorithmsList algorithms={subCategory.algorithms} />
      </Section>
    </React.Fragment>
  );
}

export async function getStaticProps({ params }) {
  const subCategory = getSubCategory(params.category, params.subCategory);
  return {
    props: {
      subCategory,
    },
  };
}

export async function getStaticPaths() {
  const paths = getSubCategories();
  return {
    paths,
    fallback: false,
  };
}
