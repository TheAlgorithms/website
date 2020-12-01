import React from "react";
import { Typography } from "@material-ui/core";
import Jumbo from "../components/jumbo";
import Navbar from "../components/navbar";
import AlgorithmsList from "../components/algorithmsList";
import { getAlgorithm } from "../lib/algorithms.ts";
import Section from "../components/section";

export default function Home({ algorithms }) {
  return (
    <React.Fragment>
      <Section title="Top algorithms">
        <AlgorithmsList algorithms={algorithms} />
      </Section>
    </React.Fragment>
  );
}

export async function getStaticProps() {
  // const data = getAllAlgorithms();

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: {
      algorithms: [
        getAlgorithm("binary-search"),
        getAlgorithm("quick-sort"),
        getAlgorithm("bogo-sort"),
      ],
    },
  };
}
