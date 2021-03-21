import { Paper, Typography, useTheme } from "@material-ui/core";
import Link from "components/link";
import { useTranslation } from "next-i18next";
import classes from "./style.module.css";

export default function Footer() {
  const theme = useTheme();
  const { t } = useTranslation("index");

  return (
    <Paper
      className={classes.outer}
      style={{
        backgroundColor:
          theme.palette.type === "dark"
            ? `${theme.palette.background.paper}`
            : "#3a4852",
      }}
      square
    >
      <div className={`section container ${classes.grid}`}>
        <img
          src="/logo_t.svg"
          className={classes.logo}
          alt="The Algorithms logo"
        />
        <Typography className={classes.name}>
          &#169; The Algorithms 2021
        </Typography>
        <div className={classes.list}>
          <Link href="/#about">{t("algorithmExplaniationFooter")}</Link>
          <Link href="/#about">{t("aboutUsFooter")}</Link>
          <Link href="/#contribute">{t("programmingLanguagesTitle")}</Link>
          <Link href="/#contribute">{t("contributeTitle")}</Link>
          <Link href="/#contribute">{t("donateTitle")}</Link>
        </div>
        <div className={classes.list}>
          <Link href="https://github.com/TheAlgorithms/">GitHub</Link>
          <Link href="https://gitter.im/TheAlgorithms/">Gitter</Link>
          <Link href="https://twitter.com/The_Algorithms">Twitter</Link>
          <Link href="/all">{t("allAlgorithmsFooter")}</Link>
          <Link href="https://github.com/TheAlgorithms/website">
            {t("sourceCodeFooter")}
          </Link>
        </div>
        <a
          className={classes.vercelLogo}
          href="https://vercel.com?utm_source=thealgorithms&utm_campaign=oss"
        >
          <img src="/powered-by-vercel-t.svg" alt="Powered by Vercel" />
        </a>
      </div>
    </Paper>
  );
}
