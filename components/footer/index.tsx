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
          <Link href="https://github.com/TheAlgorithms/">GitHub</Link>
          <Link href="https://matrix.to/#/#TheAlgorithms_community:gitter.im">
            Gitter
          </Link>
          <Link href="https://twitter.com/The_Algorithms">Twitter</Link>
          <Link href="https://github.com/TheAlgorithms/website">
            {t("sourceCodeFooter")}
          </Link>
          <Link href="mailto:hello@the-algorithms.com">{t("contact")}</Link>
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
