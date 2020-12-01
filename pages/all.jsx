import React from "react";
import AlgorithmsList from "../components/algorithmsList";
import { getAllAlgorithms } from "../lib/algorithms.ts";
import Section from "../components/section";

export default function All({ algorithms }) {
  return (
    <React.Fragment>
      <Section title="All algorithms">
        <AlgorithmsList algorithms={algorithms} />
      </Section>
    </React.Fragment>
  );
}

export async function getStaticProps() {
  return {
    props: {
      algorithms: getAllAlgorithms(),
    },
  };
}
