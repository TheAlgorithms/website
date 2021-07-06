import React, { useEffect, useRef, useState } from "react";
import "highlight.js/styles/atom-one-light.css";
import { Implementation } from "lib/models";
import { getLanguageName, Language } from "lib/repositories";
import useBodyScroll from "hooks/bodyScroll";
import LanguageIcon from "components/icon";
import { Button, Card, IconButton, Paper } from "@material-ui/core";
import { Close, OpenInNew } from "@material-ui/icons";
import useTranslation from "hooks/translation";
import classes from "./style.module.css";

export default function CodePreview({
  implementations,
}: {
  implementations: { [language: string]: Implementation };
}) {
  const codeRef = useRef<HTMLDivElement>();
  const [active, setActive] = useState(false);
  const [, setBodyScroll] = useBodyScroll();
  const [selectedLanguague, setSelectedLanguague] = useState(
    Object.keys(implementations)[0]
  );
  const t = useTranslation();

  useEffect(() => {
    function backdropClickListener(event: MouseEvent) {
      if ((event.target as HTMLDivElement).id === "__next") setActive(false);
    }
    document
      .getElementById("__next")
      .addEventListener("click", backdropClickListener);
    return () => {
      document
        .getElementById("__next")
        .removeEventListener("click", backdropClickListener);
    };
  }, []);

  useEffect(() => {
    document.getElementsByTagName("html")[0].style.scrollBehavior = "smooth";
    document.getElementById("__next").style.backgroundColor = active
      ? "rgba(122,122,122,0.2)"
      : "unset";
    setTimeout(() => {
      if (active) {
        window.scrollTo(0, 0);
      } else if (codeRef.current) {
        codeRef.current.scrollTo(0, 0);
      }
      setTimeout(
        () => {
          setBodyScroll(active);
          document.getElementsByTagName("html")[0].style.scrollBehavior =
            "unset";
        },
        active ? 400 : 0
      );
    });
    return () => {
      document.getElementById("__next").style.backgroundColor = "unset";
    };
  }, [active, setBodyScroll]);

  return (
    <div
      className={`${classes.container} ${active ? classes.active : ""}`}
      style={
        Object.keys(implementations).length === 1 &&
        Object.keys(implementations)[0] === "jupyter"
          ? { height: 50 }
          : {}
      }
    >
      <div className={classes.actions}>
        <Button
          startIcon={<OpenInNew />}
          href={implementations[selectedLanguague].url}
          target="_blank"
          rel="noreferrer"
        >
          {t("viewOnGithub")}
        </Button>
        <Paper className={classes.closeBtn}>
          <IconButton color="primary" onClick={() => setActive(false)}>
            <Close />
          </IconButton>
        </Paper>
      </div>
      <Paper className={classes.paper}>
        <div className={classes.scrollContainer}>
          {selectedLanguague !== "jupyter" && (
            <div
              ref={codeRef}
              className={classes.code}
              onClick={() => setActive(true)}
              role="button"
              tabIndex={0}
            >
              <pre className={classes.pre}>
                <code
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: implementations[selectedLanguague].code,
                  }}
                />
              </pre>
            </div>
          )}
          <div className={classes.implementations}>
            {Object.keys(implementations).map((language: Language) => (
              <Card
                key={language}
                className={
                  language === selectedLanguague
                    ? `${classes.card} ${classes.current}`
                    : classes.card
                }
              >
                <IconButton
                  className={classes.implementation}
                  onClick={() => {
                    if (language !== "jupyter") {
                      setActive(true);
                      setSelectedLanguague(language);
                    }
                  }}
                  href={
                    language === "jupyter"
                      ? implementations[language].url
                      : undefined
                  }
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t("langImplementation", {
                    language: getLanguageName(language),
                  })}
                >
                  <LanguageIcon language={language} />
                </IconButton>
              </Card>
            ))}
          </div>
        </div>
      </Paper>
    </div>
  );
}
