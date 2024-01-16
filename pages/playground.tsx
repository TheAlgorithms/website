import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { createNewPlayground } from "lib/playground";
import { LinearProgress } from "@material-ui/core";
import { Algorithm } from "lib/models";
import { Language } from "lib/repositories";
import Alert from "@material-ui/lab/Alert";
import Head from "components/head";
import PlaygroundLayout from "layouts/playground";
import useTranslation from "hooks/translation";
import { getTest } from "lib/playground/livecodes";

const PlaygroundEditor = dynamic(() => import("components/playgroundEditor"), {
  ssr: false,
});

export default function CodePlayground() {
  const t = useTranslation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const router = useRouter();
  const params = useMemo(
    () => new URLSearchParams(process.browser && window.location.search),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router]
  );
  const id = params.get("id");
  const [code, setCode] = useState<string>();
  const [tests, setTests] = useState<string>("");
  const language: string = useMemo(() => {
    if (!id) return { language: undefined, code: undefined };
    const local = localStorage.getItem(id);
    if (!local) {
      setTimeout(() => setError(t("playgroundErrIdNotFound")));
      return { language: undefined, code: undefined };
    }
    const parsed = JSON.parse(local);
    setLoading(false);
    setCode(parsed.code);
    if (parsed.tests) {
      setTests(parsed.tests);
    }
    return parsed.language;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    const algorithmParam = params.get("algorithm");
    const languageParam = params.get("language");
    if (!id && algorithmParam && languageParam) {
      (async () => {
        const algorithmResponse = await fetch(
          `/data/algorithms/${algorithmParam}.json`
        );
        if (!algorithmResponse.ok) {
          setTimeout(() => setError(t("playgroundErrInvalidLink")));
          return;
        }
        const algorithm = JSON.parse(
          await algorithmResponse.text()
        ) as Algorithm;
        if (!algorithm.implementations[languageParam as Language]) {
          setTimeout(() => setError(t("playgroundErrInvalidLink")));
          return;
        }
        const githubResponse = await fetch(
          algorithm.implementations[languageParam as Language].url
            .replace("github.com", "raw.githubusercontent.com")
            .replace("/tree/", "/")
            .replace("/blob/", "/")
        );
        if (!githubResponse.ok) {
          setTimeout(() => setError(t("playgroundErrInvalidLink")));
          return;
        }
        const githubCode = (await githubResponse.text())
          // Remove doctest from code, it is added in LiveCodes config
          .replace(/[ \t]*import doctest *\n{1,2}/g, "")
          .replace(/[ \t]*doctest\.testmod\(.*\).*\n{1,2}/g, "");

        const test = await getTest(
          languageParam,
          algorithm.implementations[languageParam as Language].url
        );

        const newId = createNewPlayground(languageParam, githubCode, test);
        setTimeout(() => router.replace(`/playground?id=${newId}`));
      })();
    } else if (!id && languageParam) {
      const newId = createNewPlayground(languageParam, "");
      setTimeout(() => router.replace(`/playground?id=${newId}`));
    } else if (!id) {
      const newId = createNewPlayground("python", "");
      setTimeout(() => router.replace(`/playground?id=${newId}`));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, language, params]);

  useEffect(() => {
    if (id && language && code)
      localStorage.setItem(id, JSON.stringify({ language, code, tests }));
  }, [code, id, language, tests]);

  return (
    <>
      <Head title={t("codeplayground")} />
      {loading && !error ? (
        <LinearProgress />
      ) : error ? (
        <Alert severity="error" style={{ margin: 30 }}>
          {error}
        </Alert>
      ) : (
        <PlaygroundEditor
          language={language}
          code={code}
          setCode={setCode}
          tests={tests}
        />
      )}
    </>
  );
}

CodePlayground.Layout = PlaygroundLayout;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "categories"])),
  },
});
