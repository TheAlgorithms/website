import React from "react";
import AlgorithmsList from "components/algorithmsList";
import { getAllAlgorithms } from "lib/algorithms";
import Section from "components/section";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function All({ algorithms }) {
  return (
    <>
      <Section title="All algorithms">
        <AlgorithmsList algorithms={algorithms} />
      </Section>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      algorithms: getAllAlgorithms(),
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
