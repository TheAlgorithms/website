import { Paper, Typography, useTheme } from "@material-ui/core";
import Link from "components/link";
import useTranslation from "hooks/translation";
import classes from "./style.module.css";

export default function Footer() {
  const theme = useTheme();
  const t = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <Paper
      className={classes.outer}
      style={{
        backgroundColor:
          theme?.palette.type === "dark"
            ? `${theme?.palette.background.paper}`
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
          &#169; The Algorithms {currentYear}
        </Typography>
        <div className={classes.list}>
          <Link href="/#about">{t("algorithmExplaniationFooter")}</Link>
          <Link href="/#aboutUs">{t("aboutUsFooter")}</Link>
          <Link href="/#programmingLanguages">
            {t("programmingLanguagesTitle")}
          </Link>
          <Link href="/#contribute">{t("contributeTitle")}</Link>
          <Link href="/#donate">{t("donateTitle")}</Link>
        </div>
        <div className={classes.list}>
          <a
            href="https://github.com/TheAlgorithms/"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://matrix.to/#/#TheAlgorithms_community:gitter.im"
            target="_blank"
            rel="noreferrer"
          >
            Gitter
          </a>
          <a
            href="https://twitter.com/The_Algorithms"
            target="_blank"
            rel="noreferrer"
          >
            X
          </a>
          <a
            href="https://github.com/TheAlgorithms/website"
            target="_blank"
            rel="noreferrer"
          >
            {t("sourceCodeFooter")}
          </a>
          <a
            href="mailto:hello@the-algorithms.com"
            target="_blank"
            rel="noreferrer"
          >
            {t("contact")}
          </a>
        </div>
        <a
          className={classes.vercelLogo}
          href="https://vercel.com?utm_source=thealgorithms&utm_campaign=oss"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/powered-by-vercel-t.svg" alt="Powered by Vercel" />
        </a>
      </div>
    </Paper>
  );
}
