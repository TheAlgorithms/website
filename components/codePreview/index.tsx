import React, { useEffect, useRef, useState } from "react";
import "highlight.js/styles/atom-one-light.css";
import { Implementation } from "lib/models";
import { Language } from "lib/repositories";
import useBodyScroll from "hooks/bodyScroll";
import LanguageIcon from "components/icon";
import { Button, IconButton } from "@material-ui/core";
import { Close, OpenInNew } from "@material-ui/icons";
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

  useEffect(() => {
    document.getElementsByTagName("html")[0].style.scrollBehavior = "smooth";
    setTimeout(() => {
      if (active) window.scrollTo(0, 0);
      else if (codeRef.current) codeRef.current.scrollTo(0, 0);
      setTimeout(
        () => {
          setBodyScroll(active);
          document.getElementsByTagName("html")[0].style.scrollBehavior =
            "unset";
        },
        active ? 400 : 0
      );
    });
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
        >
          View on GitHub
        </Button>
        <Button
          variant="outlined"
          startIcon={<Close />}
          onClick={() => setActive(false)}
        >
          Close
        </Button>
      </div>
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
            <IconButton
              className={classes.implementation}
              key={language}
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
            >
              <LanguageIcon
                language={language}
                color={language === selectedLanguague ? "action" : "disabled"}
              />
            </IconButton>
          ))}
        </div>
      </div>
    </div>
  );
}
