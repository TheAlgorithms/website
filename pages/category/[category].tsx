import React from "react";
import AlgorithmsList from "components/algorithmsList";
import { getCategories, getCategory } from "lib/categories";
import Section from "components/section";
import Head from "components/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPaths, GetStaticProps } from "next";

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

export const getStaticProps: GetStaticProps = async ({ params, locale }) => ({
  props: {
    category: await getCategory(params.category.toString()),
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getCategories(),
  fallback: false,
});
