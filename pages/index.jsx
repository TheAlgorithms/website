import React from "react";
import { Card, CardContent, Icon, Paper, Typography } from "@material-ui/core";
import Jumbo from "../components/jumbo";
import Navbar from "../components/navbar";
import AlgorithmsList from "../components/algorithmsList";
import { getAlgorithm } from "../lib/algorithms.ts";
import Section from "../components/section";
import CategoriesList from "../components/categoriesList";
import classes from "./index.module.css";
import ScrollableAnchor from "react-scrollable-anchor";

export default function Home({ topAlgorithms, featuredAlgorithms }) {
  return (
    <React.Fragment>
      <Section title="Top algorithms">
        <AlgorithmsList noCategories algorithms={topAlgorithms} />
      </Section>
      <div id="about">
        <Section>
          <Card className={classes.card}>
            <CardContent>
              <div className={classes.twoCols}>
                <Typography>
                  <Typography variant="h5" className={classes.title}>
                    What is an algorithm?
                  </Typography>
                  An algorithm is a set of rules that takes in one or more
                  inputs, then performs inner calculations and data
                  manipulations and returns an output or a set of outputs. In
                  short, algorithms make life easy. From complex data
                  manipulations and hashes, to simple arithmetic, algorithms
                  follow a set of steps to produce a useful result. One example
                  of an algorithm would be a simple function that takes two
                  input values, adds them together and returns their sum.
                </Typography>
                <div />
                <Typography>
                  <Typography variant="h5" className={classes.title}>
                    About Us
                  </Typography>
                  We are a group of programmers helping each other to build new
                  things, whether it be writing complex encryption programs, or
                  simple ciphers. Our goal is to work together to document and
                  model beautiful, helpful and interesting algorithms using
                  code. We are an open-source community - anyone can contribute.
                  We check each other's work, communicate and collaborate to
                  solve problems. We strive to be welcoming, respectful, yet
                  make sure that our code follows the latest programming
                  guidelines.
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Section>
      </div>
      <Section title="Featured algorithms">
        <AlgorithmsList noCategories algorithms={featuredAlgorithms} />
      </Section>
      <Section title="Top categories">
        <CategoriesList
          categories={[
            {
              name: "Sorts",
              icon: "sort",
              href: "/category/sorts",
            },
            {
              name: "Searches",
              icon: "search",
              href: "/category/searches",
            },
            {
              name: "Dynamic Programming",
              icon: "bolt",
              href: "/category/dynamicprogramming",
            },
            {
              name: "Ciphers",
              icon: "enhanced_encryption",
              href: "/category/ciphers",
            },
            {
              name: "Data Structures",
              icon: "grid_view",
              href: "/category/datastructures",
            },
            {
              name: "Basic Math",
              icon: "calculate",
              href: "/category/maths",
            },
            {
              name: "Image Processing",
              icon: "insert_photo",
              href: "/category/digitalimageprocessing",
            },
          ]}
        />
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
      topAlgorithms: [
        getAlgorithm("binary-search"),
        getAlgorithm("quick-sort"),
        getAlgorithm("bogo-sort"),
      ],
      featuredAlgorithms: [
        getAlgorithm("coinchange"),
        getAlgorithm("caesar-cipher"),
        getAlgorithm("bellman-ford"),
      ],
    },
  };
}
