import React from "react";
import AlgorithmsList from "components/algorithmsList";
import { getCategories, getCategory } from "lib/categories";
import Section from "components/section";
import Head from "components/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Category({ category }) {
  return (
    <>
      <Head title={category.name} />
      <Section title={category.name}>
        <AlgorithmsList algorithms={category.algorithms} />
      </Section>
    </>
  );
}

export async function getStaticProps({ params, locale }) {
  const category = getCategory(params.category);
  return {
    props: {
      category,
      ...(await serverSideTranslations(locale, ["common"])),
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
