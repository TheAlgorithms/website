import React from "react";
import AlgorithmsList from "components/algorithmsList";
import { getAllAlgorithms } from "lib/algorithms";
import Section from "components/section";

export default function All({ algorithms }) {
  return (
    <>
      <Section title="All algorithms">
        <AlgorithmsList algorithms={algorithms} />
      </Section>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      algorithms: getAllAlgorithms(),
    },
  };
}
