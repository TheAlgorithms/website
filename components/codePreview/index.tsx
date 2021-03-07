import React, { useEffect, useRef, useState } from "react";
import "highlight.js/styles/atom-one-light.css";
import { Language } from "lib/models";
import useBodyScroll from "hooks/bodyScroll";
import LanguageIcon from "components/icon";
import { Button, Icon, IconButton } from "@material-ui/core";
import classes from "./style.module.css";

export default function CodePreview({
  code,
  implementations,
}: {
  code: { [language in Language]?: string };
  implementations: { [language in Language]?: string };
}) {
  const codeRef = useRef<HTMLDivElement>();
  const [active, setActive] = useState(false);
  const [, setBodyScroll] = useBodyScroll();
  const [selectedLanguague, setSelectedLanguague] = useState(
    Object.keys(code)[0]
  );

  useEffect(() => {
    document.getElementsByTagName("html")[0].style.scrollBehavior = "smooth";
    setTimeout(() => {
      if (active) window.scrollTo(0, 0);
      else codeRef.current.scrollTo(0, 0);
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
    <div className={`${classes.container} ${active ? classes.active : ""}`}>
      <div className={classes.actions}>
        <Button
          startIcon={<Icon>open_in_new</Icon>}
          href={implementations[selectedLanguague]}
          target="_blank"
        >
          View on GitHub
        </Button>
        <Button startIcon={<Icon>close</Icon>} onClick={() => setActive(false)}>
          Close
        </Button>
      </div>
      <div className={classes.scrollContainer}>
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
              dangerouslySetInnerHTML={{ __html: code[selectedLanguague] }}
            />
          </pre>
        </div>
        <div className={classes.implementations}>
          {Object.keys(code).map((language: Language) => (
            <IconButton
              className={classes.implementation}
              key={language}
              onClick={() => {
                setActive(true);
                setSelectedLanguague(language);
              }}
            >
              <LanguageIcon
                language={language}
                color={language === selectedLanguague ? "inherit" : "disabled"}
              />
            </IconButton>
          ))}
        </div>
      </div>
    </div>
  );
}
