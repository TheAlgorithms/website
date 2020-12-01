import React, { useEffect, useState } from "react";
import AlgorithmsList from "../../components/algorithmsList";
import search from "../../lib/search";
import Section from "../../components/section";
import Head from "next/head";

export default function Search({ query, algorithms }) {
  return (
    <React.Fragment>
      <Head>
        <title>"{query}" - TheAlgorithms</title>
      </Head>
      <Section title={`Search "${query}"`}>
        {algorithms && <AlgorithmsList algorithms={algorithms} />}
      </Section>
    </React.Fragment>
  );
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      query: params.query,
      algorithms: search(params.query),
    },
  };
}
