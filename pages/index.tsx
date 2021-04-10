import React from "react";
import {
  Button,
  Card,
  CardContent,
  Icon,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import AlgorithmsList from "components/algorithmsList";
import LanguagesList from "components/languagesList";
import { getAlgorithm } from "lib/algorithms";
import Section from "components/section";
import CategoriesList from "components/categoriesList";
import { Language, Languages } from "lib/models";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import SanitizedHTML from "react-sanitized-html";
import classes from "./index.module.css";

export default function Home({ topAlgorithms, featuredAlgorithms }) {
  const { t } = useTranslation("common");

  return (
    <>
      <Section title={t("topAlgorithms")}>
        <AlgorithmsList noCategories algorithms={topAlgorithms} />
      </Section>
      <div id="about">
        <Section>
          <Card className={classes.card}>
            <CardContent>
              <div className={classes.twoCols}>
                <div>
                  <Typography variant="h5" className={classes.title}>
                    {t("algorithmExplanationTitle")}
                  </Typography>
                  <Typography>{t("algorithmExplanation")}</Typography>
                </div>
                <div />
                <div>
                  <Typography variant="h5" className={classes.title}>
                    {t("aboutUsTitle")}
                  </Typography>
                  <Typography>{t("aboutUs")}</Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </Section>
      </div>
      <Section title={t("featuredAlgorithms")}>
        <AlgorithmsList noCategories algorithms={featuredAlgorithms} />
      </Section>
      <Section title={t("topCategories")}>
        <CategoriesList
          categories={[
            {
              name: t("sortsCategories"),
              icon: "sort",
              href: "/category/sorts",
            },
            {
              name: t("searchesCategories"),
              icon: "search",
              href: "/category/searches",
            },
            {
              name: t("dynamicProgrammingCategories"),
              icon: "bolt",
              href: "/category/dynamicprogramming",
            },
            {
              name: t("ciphersCategories"),
              icon: "enhanced_encryption",
              href: "/category/ciphers",
            },
            {
              name: t("dataStructuresCategories"),
              icon: "grid_view",
              href: "/category/datastructures",
            },
            {
              name: t("basicMathCategories"),
              icon: "calculate",
              href: "/category/maths",
            },
            {
              name: t("imageProcessingCategories"),
              icon: "insert_photo",
              href: "/category/digitalimageprocessing",
            },
          ]}
        />
      </Section>

      <div id="contribute">
        <Section>
          <Card className={classes.card}>
            <CardContent>
              <div className={classes.twoCols}>
                <div>
                  <Typography variant="h5" className={classes.title}>
                    {t("programmingLanguagesTitle")}
                  </Typography>
                  <Typography>{t("programmingLanguages")}</Typography>
                  <LanguagesList
                    languages={Object.keys(Languages).map(
                      (langName: Language) => ({
                        name: langName,
                        href: `/language/${langName}`,
                      })
                    )}
                    className={classes.languages}
                    outlined
                  />
                </div>
                <div />
                <div>
                  <Typography variant="h5" className={classes.title}>
                    {t("contributeTitle")}
                  </Typography>
                  <div className="MuiTypography-root MuiTypography-body1">
                    <SanitizedHTML allowedTags={["a"]} html={t("contribute")} />
                  </div>
                  <Button
                    variant="contained"
                    className={classes.github}
                    href="https://github.com/TheAlgorithms/"
                    target="_blank"
                  >
                    <i className="devicon-github-original" />
                    GitHub
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.weblate}
                    href="https://hosted.weblate.org/engage/TheAlgorithms/?utm_source=widget"
                    target="_blank"
                  >
                    Weblate
                  </Button>
                  <Typography variant="h5" className={classes.title}>
                    {t("donateTitle")}
                  </Typography>
                  <div className="MuiTypography-root MuiTypography-body1">
                    <SanitizedHTML allowedTags={["a"]} html={t("donateText")} />
                  </div>
                  <Button
                    variant="contained"
                    className={classes.donate}
                    href="https://liberapay.com/TheAlgorithms/donate"
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 80 80"
                      height="16"
                      width="16"
                      x="7"
                      y="7"
                    >
                      <g transform="translate(-78.37-208.06)" fill="#1a171b">
                        <path d="m104.28 271.1c-3.571 0-6.373-.466-8.41-1.396-2.037-.93-3.495-2.199-4.375-3.809-.88-1.609-1.308-3.457-1.282-5.544.025-2.086.313-4.311.868-6.675l9.579-40.05 11.69-1.81-10.484 43.44c-.202.905-.314 1.735-.339 2.489-.026.754.113 1.421.415 1.999.302.579.817 1.044 1.546 1.395.729.353 1.747.579 3.055.679l-2.263 9.278" />
                        <path d="m146.52 246.14c0 3.671-.604 7.03-1.811 10.07-1.207 3.043-2.879 5.669-5.01 7.881-2.138 2.213-4.702 3.935-7.693 5.167-2.992 1.231-6.248 1.848-9.767 1.848-1.71 0-3.42-.151-5.129-.453l-3.394 13.651h-11.162l12.52-52.19c2.01-.603 4.311-1.143 6.901-1.622 2.589-.477 5.393-.716 8.41-.716 2.815 0 5.242.428 7.278 1.282 2.037.855 3.708 2.024 5.02 3.507 1.307 1.484 2.274 3.219 2.904 5.205.627 1.987.942 4.11.942 6.373m-27.378 15.461c.854.202 1.91.302 3.167.302 1.961 0 3.746-.364 5.355-1.094 1.609-.728 2.979-1.747 4.111-3.055 1.131-1.307 2.01-2.877 2.64-4.714.628-1.835.943-3.858.943-6.071 0-2.161-.479-3.998-1.433-5.506-.956-1.508-2.615-2.263-4.978-2.263-1.61 0-3.118.151-4.525.453l-5.28 21.948" />
                      </g>
                    </svg>
                    {t("donateButton")}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </Section>
        <Section className={classes.social}>
          <Typography variant="h4" className={classes.socialTitle}>
            {t("socialTitle")}
          </Typography>
          <div className={classes.socialButtons}>
            <Tooltip title={t("socialGithub")}>
              <IconButton
                href="https://github.com/TheAlgorithms"
                target="_blank"
              >
                <Icon
                  className="devicon-github-plain"
                  style={{ fontSize: "1em", color: "black" }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Twitter">
              <IconButton href="https://discord.gg/c7MnfGFGa6" target="_blank">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#03a9f4"
                    d="M512,97.248c-19.04,8.352-39.328,13.888-60.48,16.576c21.76-12.992,38.368-33.408,46.176-58.016
          c-20.288,12.096-42.688,20.64-66.56,25.408C411.872,60.704,384.416,48,354.464,48c-58.112,0-104.896,47.168-104.896,104.992
          c0,8.32,0.704,16.32,2.432,23.936c-87.264-4.256-164.48-46.08-216.352-109.792c-9.056,15.712-14.368,33.696-14.368,53.056
          c0,36.352,18.72,68.576,46.624,87.232c-16.864-0.32-33.408-5.216-47.424-12.928c0,0.32,0,0.736,0,1.152
          c0,51.008,36.384,93.376,84.096,103.136c-8.544,2.336-17.856,3.456-27.52,3.456c-6.72,0-13.504-0.384-19.872-1.792
          c13.6,41.568,52.192,72.128,98.08,73.12c-35.712,27.936-81.056,44.768-130.144,44.768c-8.608,0-16.864-0.384-25.12-1.44
          C46.496,446.88,101.6,464,161.024,464c193.152,0,298.752-160,298.752-298.688c0-4.64-0.16-9.12-0.384-13.568
          C480.224,136.96,497.728,118.496,512,97.248z"
                  />
                </svg>
              </IconButton>
            </Tooltip>
            <Tooltip title={t("socialGitter")}>
              <IconButton
                href="https://gitter.im/TheAlgorithms/"
                target="_blank"
              >
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 128 128"
                >
                  <rect x="96.8" y="25.6" width="10.2" height="51.2" />
                  <rect x="71.2" y="25.6" width="10.2" height="102.4" />
                  <rect x="45.6" y="25.6" width="10.2" height="102.4" />
                  <rect x="20" y="0" width="10.2" height="76.8" />
                </svg>
              </IconButton>
            </Tooltip>
            <Tooltip title={t("socialDiscord")}>
              <IconButton href="https://discord.gg/c7MnfGFGa6" target="_blank">
                <svg version="1.1" viewBox="0 0 245 240">
                  <path
                    fill="#7289da"
                    d="M104.4,103.9c-5.7,0-10.2,5-10.2,11.1s4.6,11.1,10.2,11.1c5.7,0,10.2-5,10.2-11.1C114.7,108.9,110.1,103.9,104.4,103.9z
	 M140.9,103.9c-5.7,0-10.2,5-10.2,11.1s4.6,11.1,10.2,11.1c5.7,0,10.2-5,10.2-11.1S146.6,103.9,140.9,103.9z"
                  />
                  <path
                    fill="#7289da"
                    d="M201.8,1.7H43.2C29.9,1.7,19,12.6,19,26.1V186c0,13.5,10.9,24.4,24.2,24.4h134.1l-6.3-21.9l15.1,14.1l14.3,13.2l25.4,22.5
	V26.1C226,12.6,215.1,1.7,201.8,1.7z M156.1,156.2c0,0-4.3-5.1-7.8-9.6c15.5-4.4,21.4-14.1,21.4-14.1c-4.8,3.2-9.5,5.4-13.6,7
	c-5.9,2.5-11.6,4.1-17.2,5.1c-11.4,2.1-21.8,1.5-30.6-0.1c-6.7-1.3-12.5-3.2-17.4-5.1c-2.7-1.1-5.7-2.4-8.6-4
	c-0.4-0.2-0.7-0.4-1.1-0.6c-0.2-0.1-0.4-0.2-0.5-0.4c-2.1-1.2-3.3-2-3.3-2s5.7,9.5,20.7,14c-3.5,4.5-7.9,9.8-7.9,9.8
	c-26.1-0.8-36.1-18-36.1-18c0-38.1,17-69,17-69c17-12.8,33.2-12.4,33.2-12.4l1.2,1.4c-21.3,6.2-31.1,15.5-31.1,15.5s2.6-1.4,7-3.4
	c12.7-5.6,22.7-7.1,26.9-7.5c0.7-0.1,1.3-0.2,2-0.2c7.2-0.9,15.4-1.2,23.9-0.2c11.2,1.3,23.3,4.6,35.6,11.4c0,0-9.3-8.9-29.5-15
	l1.7-1.9c0,0,16.2-0.4,33.2,12.4c0,0,17,30.9,17,69C192.3,138.2,182.2,155.4,156.1,156.2z"
                  />
                </svg>
              </IconButton>
            </Tooltip>
          </div>
        </Section>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  // const data = getAllAlgorithms();

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: {
      topAlgorithms: [
        getAlgorithm("binary-search"),
        getAlgorithm("quick-sort"),
        getAlgorithm("longest-common-subsequence"),
      ],
      featuredAlgorithms: [
        getAlgorithm("coinchange"),
        getAlgorithm("logistic-regression"),
        getAlgorithm("caesar-cipher"),
        getAlgorithm("a-simple-gan"),
        getAlgorithm("bellman-ford"),
        getAlgorithm("bogo-sort"),
      ],
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
