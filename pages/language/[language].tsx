import React from "react";
import { Typography, Button, Icon } from "@material-ui/core";
import AlgorithmsList from "../../components/algorithmsList";
import Section from "../../components/section";
import Head from "../../components/head";
import { getLanguage, getLanguages } from "../../lib/languages";
import classes from "./style.module.css";
import { getLanguageName } from "../../lib/models";

export default function Language({ language }) {
  return (
    <>
      <Head title={getLanguageName(language.name)} />
      <Section>
        <div className={classes.titleContainer}>
          <Typography variant="h4">{getLanguageName(language.name)}</Typography>
          <div>
            <Button
              startIcon={<Icon>open_in_new</Icon>}
              href={`https://github.com/TheAlgorithms/${language.name}`}
            >
              Github Repo
            </Button>
            {["c", "c-plus-plus"].includes(language.name.toLowerCase()) && (
              <Button
                startIcon={<Icon>open_in_new</Icon>}
                href={`https://thealgorithms.github.io/${language.name
                  .replace(/^c$/, "C")
                  .replace(/^c-plus-plus$/, "C-Plus-Plus")}`}
              >
                Documentation
              </Button>
            )}
          </div>
        </div>
        <AlgorithmsList algorithms={language.algorithms} />
      </Section>
    </>
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
