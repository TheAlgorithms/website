import { useTheme } from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import classes from "./style.module.css";
import atomOneLight from "react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-light";
import atomOneDark from "react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark";

export default function CodePreview({ code, language }) {
  const [hovered, setHovered] = useState(false);
  const theme = useTheme();
  const darkTheme = useMemo(() => theme.palette.type == "dark", [theme]);

  const syntaxHighlighterDark = useMemo(
    () => (
      <SyntaxHighlighter
        customStyle={{
          minHeight: "100%",
          margin: 0,
          background: "rgba(0,0,0,0.3)",
        }}
        language={language.toLowerCase()}
        style={atomOneDark}
      >
        {code}
      </SyntaxHighlighter>
    ),
    []
  );

  const syntaxHighlighterLight = useMemo(
    () => (
      <SyntaxHighlighter
        customStyle={{
          minHeight: "100%",
          margin: 0,
          background: "rgba(0,0,0,0.03)",
        }}
        language={language.toLowerCase()}
        style={atomOneLight}
      >
        {code}
      </SyntaxHighlighter>
    ),
    []
  );

  return (
    <div
      className={`${classes.codeContainer} ${darkTheme && "dark"}`}
      onClick={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {!hovered && <div className={classes.codeContainerGradient} />}
      <div
        className={
          hovered ? classes.codeHover + " " + classes.code : classes.code
        }
      >
        {darkTheme ? syntaxHighlighterDark : syntaxHighlighterLight}
      </div>
    </div>
  );
}
