import React from "react";
import { Typography, Button } from "@material-ui/core";
import AlgorithmsList from "components/algorithmsList";
import Section from "components/section";
import Head from "components/head";
import { getLanguage, getLanguages } from "lib/languages";
import { getLanguageName, Language } from "lib/repositories";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import LanguageIcon from "components/icon";
import { OpenInNew } from "@material-ui/icons";
import { GetStaticPaths, GetStaticProps } from "next";
import useTranslation from "hooks/translation";
import { shouldUseISR } from "lib/aws";
import { Algorithm } from "lib/models";
import classes from "./style.module.css";

export default function LanguagePage({
  language,
  languageKey,
}: {
  language: { name: Language; algorithms: Algorithm[] };
  languageKey: string;
}) {
  const t = useTranslation();

  return (
    <>
      <Head
        title={getLanguageName(language.name)}
        description={t("languageMetaDescription", { language: language.name })}
        tags={[language.name]}
      />
      <Section>
        <div className={classes.titleContainer}>
          <Typography variant="h4">
            <LanguageIcon language={language.name} className={classes.icon} />
            {getLanguageName(language.name)}
          </Typography>
          <div>
            <Button
              startIcon={<OpenInNew />}
              href={`https://github.com/TheAlgorithms/${language.name}`}
            >
              {t("githubRepository")}
            </Button>
            {["c", "c-plus-plus", "julia"].includes(
              language.name.toLowerCase()
            ) && (
              <Button
                startIcon={<OpenInNew />}
                href={`https://thealgorithms.github.io/${language.name
                  .replace(/^c$/, "C")
                  .replace(/^c-plus-plus$/, "C-Plus-Plus")
                  .replace(/^julia$/, "Julia/dev")}`}
              >
                {t("documentationLanguage")}
              </Button>
            )}
          </div>
        </div>
        <AlgorithmsList
          algorithms={language.algorithms.map((algorithm) => ({
            ...algorithm,
            slug: `${algorithm.slug}?lang=${languageKey}`,
          }))}
        />
      </Section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const language = await getLanguage(params.language.toString());
  if (!language) return { notFound: true };
  return {
    props: {
      language,
      languageKey: params.language.toString(),
      ...(await serverSideTranslations(locale, ["common", "categories"])),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () =>
  shouldUseISR
    ? {
        paths: [],
        fallback: "blocking",
      }
    : {
        paths: getLanguages(),
        fallback: false,
      };
