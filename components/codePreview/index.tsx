import React, { useState } from "react";
import "highlight.js/styles/atom-one-light.css";
import LanguageIcon from "components/icon";
import { Language } from "lib/models";
import { Button, Icon, IconButton } from "@material-ui/core";
import classes from "./style.module.css";

export default function CodePreview({
  code,
  implementations,
}: {
  code: { [language in Language]?: string };
  implementations: { [language in Language]?: string };
}) {
  const [hovered, setHovered] = useState(false);
  const [exampleLanguage, setExampleLanguage] = useState<Language>(
    Object.keys(code)[0] as Language
  );

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      onClick={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={classes.codeContainer}
    >
      <div className={classes.codeContainer}>
        {!hovered && <div className={classes.codeContainerGradient} />}
        <pre
          className={
            hovered ? `${classes.codeHover} ${classes.code}` : classes.code
          }
        >
          {/* eslint-disable-next-line react/no-danger */}
          <code dangerouslySetInnerHTML={{ __html: code[exampleLanguage] }} />
        </pre>
      </div>
      {Object.keys(code).map((language: Language) => (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <IconButton
          key={language}
          className={classes.languageIcon}
          onClick={() => setExampleLanguage(language)}
        >
          <LanguageIcon language={language} />
        </IconButton>
      ))}
      <Button
        startIcon={<Icon>open_in_new</Icon>}
        className={classes.viewOnGithub}
        href={implementations[exampleLanguage]}
        target="_blank"
        rel="noref"
      >
        View on GitHub
      </Button>
    </div>
  );
}
