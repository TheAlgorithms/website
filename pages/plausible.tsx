import { Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import Section from "components/section";
import IframeResizer from "iframe-resizer-react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import type { darkTheme } from "hooks/themes";
import useTranslation from "hooks/translation";
import Translation from "components/translation";

export default function Plausible() {
  const theme = useTheme<typeof darkTheme>();
  const dark = theme?.palette.type === "dark";
  const t = useTranslation();

  return (
    <Section title={t("analyticsTitle")}>
      <Typography>
        <Translation name="analyticsText" links={["https://plausible.io/"]} />
      </Typography>
      <IframeResizer
        frameBorder={0}
        loading="lazy"
        src={`https://plausible.shorsh.de/share/the-algorithms.com?auth=4kqE5dFIzOd7p0ehAfdYB&embed=true&theme=${
          dark ? "dark" : "light"
        }&background=%23fff0`}
      />
    </Section>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
