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
import { Language, Repositories } from "lib/repositories";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import GithubOriginalIcon from "react-devicons/github/original";
import GitterPlainIcon from "react-devicons/gitter/plain";
import WeblatePlainIcon from "react-devicons/weblate/plain";
import {
  Search,
  Sort,
  OfflineBolt,
  EnhancedEncryption,
  Storage,
  Functions,
  InsertPhoto,
  FormatQuote,
} from "@material-ui/icons";
import Translation from "components/translation";
import useTranslation from "hooks/translation";
import Head from "components/head";
import getRepositoryStars from "lib/stars";
import { Algorithm } from "lib/models";
import HomeLayout from "layouts/home";
import classes from "./index.module.css";

export default function Home({
  topAlgorithms,
  featuredAlgorithms,
  stars,
}: {
  topAlgorithms: Algorithm[];
  featuredAlgorithms: Algorithm[];
  stars: { [key: string]: number };
}) {
  const t = useTranslation();

  return (
    <>
      <Head description={t("indexMetaDescription")} />
      <Section title={t("topAlgorithms")}>
        <AlgorithmsList noCategories algorithms={topAlgorithms} />
      </Section>
      <div>
        <Section>
          <Card className={classes.card}>
            <CardContent>
              <div className={classes.twoCols}>
                <div>
                  <Typography id="about" variant="h5" className={classes.title}>
                    {t("algorithmExplanationTitle")}
                  </Typography>
                  <Typography>{t("algorithmExplanation")}</Typography>
                </div>
                <div />
                <div>
                  <Typography
                    id="aboutUs"
                    variant="h5"
                    className={classes.title}
                  >
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
              name: t("categories:sorts"),
              icon: <Sort />,
              href: "/category/sorts",
            },
            {
              name: t("categories:searches"),
              icon: <Search />,
              href: "/category/searches",
            },
            {
              name: t("categories:dynamicprogramming"),
              icon: <OfflineBolt />,
              href: "/category/dynamicprogramming",
            },
            {
              name: t("categories:ciphers"),
              icon: <EnhancedEncryption />,
              href: "/category/ciphers",
            },
            {
              name: t("categories:datastructures"),
              icon: <Storage />,
              href: "/category/datastructures",
            },
            {
              name: t("categories:math"),
              icon: <Functions />,
              href: "/category/math",
            },
            {
              name: t("categories:digitalimageprocessing"),
              icon: <InsertPhoto />,
              href: "/category/digitalimageprocessing",
            },
            {
              name: t("categories:strings"),
              icon: <FormatQuote />,
              href: "/category/strings",
            },
          ]}
        />
      </Section>

      <div>
        <Section>
          <Card className={classes.card}>
            <CardContent>
              <div className={classes.twoCols}>
                <div>
                  <Typography
                    id="programmingLanguages"
                    variant="h5"
                    className={classes.title}
                  >
                    {t("programmingLanguagesTitle")}
                  </Typography>
                  <Typography>{t("programmingLanguages")}</Typography>
                  <LanguagesList
                    languages={Object.keys(Repositories).map(
                      (langName: Language) => ({
                        name: langName,
                        href: `/language/${langName}`,
                        stars: stars[langName],
                      })
                    )}
                    sortable
                  />
                </div>
                <div />
                <div>
                  <Typography
                    id="contribute"
                    variant="h5"
                    className={classes.title}
                  >
                    {t("contributeTitle")}
                  </Typography>
                  <div className="MuiTypography-root MuiTypography-body1">
                    <Translation
                      name="contribute"
                      links={[
                        "https://hosted.weblate.org/engage/TheAlgorithms/?utm_source=widget",
                      ]}
                    />
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      className={classes.github}
                      href="https://github.com/TheAlgorithms/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <GithubOriginalIcon color="white" />
                      GitHub
                    </Button>
                    <Button
                      variant="contained"
                      className={classes.weblate}
                      href="https://hosted.weblate.org/engage/TheAlgorithms/?utm_source=widget"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <WeblatePlainIcon color="black" />
                      Weblate
                    </Button>
                    <Typography
                      id="donate"
                      variant="h5"
                      className={classes.title}
                    >
                      {t("donateTitle")}
                    </Typography>
                    <div className="MuiTypography-root MuiTypography-body1">
                      <Translation
                        name="donateText"
                        links={["https://liberapay.com/"]}
                      />
                    </div>
                    <Button
                      variant="contained"
                      className={classes.donate}
                      href="https://liberapay.com/TheAlgorithms/donate"
                      target="_blank"
                      rel="noreferrer"
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
              <Card>
                <IconButton
                  href="https://github.com/TheAlgorithms"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t("socialGithub")}
                >
                  <Icon style={{ fontSize: "1em" }}>
                    <GithubOriginalIcon color="" />
                  </Icon>
                </IconButton>
              </Card>
            </Tooltip>
            <Tooltip title="X">
              <Card>
                <IconButton
                  href="https://twitter.com/The_Algorithms"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t("X")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="512"
                    height="512"
                    viewBox="0 0 512 512"
                    version="1.1"
                  >
                    <g id="surface1">
                      <path d="M 304.757812 217.003906 L 495.394531 0 L 450.234375 0 L 284.636719 188.382812 L 152.472656 0 L 0 0 L 199.902344 284.894531 L 0 512.425781 L 45.160156 512.425781 L 219.921875 313.445312 L 359.527344 512.425781 L 512 512.425781 M 61.457031 33.347656 L 130.832031 33.347656 L 450.203125 480.71875 L 380.808594 480.71875 " />
                    </g>
                  </svg>
                </IconButton>
              </Card>
            </Tooltip>
            <Tooltip title={t("socialGitter")}>
              <Card>
                <IconButton
                  href="https://matrix.to/#/#TheAlgorithms_community:gitter.im"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t("socialGitter")}
                >
                  <Icon style={{ fontSize: "1em" }}>
                    <GitterPlainIcon color="" />
                  </Icon>
                </IconButton>
              </Card>
            </Tooltip>
            <Tooltip title={t("socialDiscord")}>
              <Card>
                <IconButton
                  href="https://the-algorithms.com/discord/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t("socialDiscord")}
                >
                  <svg
                    width="71"
                    height="80"
                    viewBox="0 0 71 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M60.1045 13.8978C55.5792 11.8214 50.7265 10.2916 45.6527 9.41542C45.5603 9.39851 45.468 9.44077 45.4204 9.52529C44.7963 10.6353 44.105 12.0834 43.6209 13.2216C38.1637 12.4046 32.7345 12.4046 27.3892 13.2216C26.905 12.0581 26.1886 10.6353 25.5617 9.52529C25.5141 9.44359 25.4218 9.40133 25.3294 9.41542C20.2584 10.2888 15.4057 11.8186 10.8776 13.8978C10.8384 13.9147 10.8048 13.9429 10.7825 13.9795C1.57795 27.7309 -0.943561 41.1443 0.293408 54.3914C0.299005 54.4562 0.335386 54.5182 0.385761 54.5576C6.45866 59.0174 12.3413 61.7249 18.1147 63.5195C18.2071 63.5477 18.305 63.5139 18.3638 63.4378C19.7295 61.5728 20.9469 59.6063 21.9907 57.5383C22.0523 57.4172 21.9935 57.2735 21.8676 57.2256C19.9366 56.4931 18.0979 55.6 16.3292 54.5858C16.1893 54.5041 16.1781 54.304 16.3068 54.2082C16.679 53.9293 17.0513 53.6391 17.4067 53.3461C17.471 53.2926 17.5606 53.2813 17.6362 53.3151C29.2558 58.6202 41.8354 58.6202 53.3179 53.3151C53.3935 53.2785 53.4831 53.2898 53.5502 53.3433C53.9057 53.6363 54.2779 53.9293 54.6529 54.2082C54.7816 54.304 54.7732 54.5041 54.6333 54.5858C52.8646 55.6197 51.0259 56.4931 49.0921 57.2228C48.9662 57.2707 48.9102 57.4172 48.9718 57.5383C50.038 59.6034 51.2554 61.5699 52.5959 63.435C52.6519 63.5139 52.7526 63.5477 52.845 63.5195C58.6464 61.7249 64.529 59.0174 70.6019 54.5576C70.6551 54.5182 70.6887 54.459 70.6943 54.3942C72.1747 39.0791 68.2147 25.7757 60.1968 13.9823C60.1772 13.9429 60.1437 13.9147 60.1045 13.8978ZM23.7259 46.3253C20.2276 46.3253 17.3451 43.1136 17.3451 39.1693C17.3451 35.225 20.1717 32.0133 23.7259 32.0133C27.308 32.0133 30.1626 35.2532 30.1066 39.1693C30.1066 43.1136 27.28 46.3253 23.7259 46.3253ZM47.3178 46.3253C43.8196 46.3253 40.9371 43.1136 40.9371 39.1693C40.9371 35.225 43.7636 32.0133 47.3178 32.0133C50.9 32.0133 53.7545 35.2532 53.6986 39.1693C53.6986 43.1136 50.9 46.3253 47.3178 46.3253Z"
                      fill="#5865F2"
                    />
                  </svg>
                </IconButton>
              </Card>
            </Tooltip>
          </div>
        </Section>
      </div>
    </>
  );
}

Home.Layout = HomeLayout;

export async function getStaticProps({ locale }) {
  const stars = await getRepositoryStars();
  return {
    props: {
      topAlgorithms: [
        await getAlgorithm("binary-search", true),
        await getAlgorithm("quick-sort", true),
        await getAlgorithm("fibonacci-numbers", true),
      ],
      featuredAlgorithms: [
        await getAlgorithm("coin-change", true),
        await getAlgorithm("logistic-regression", true),
        await getAlgorithm("caesar-cipher", true),
        await getAlgorithm("a-simple-gan", true),
        await getAlgorithm("bellman-ford", true),
        await getAlgorithm("bogo-sort", true),
      ],
      ...(await serverSideTranslations(locale, ["common", "categories"])),
      stars,
    },
  };
}
