import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import classes from "./style.module.css";

export default function CodePreview({ code, language }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={classes.codeContainer}
      onClick={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {!hovered && <div className={classes.codeContainerGradient} />}
      <div
        className={
          hovered ? classes.codeHover + " " + classes.code : classes.code
        }
      >
        <SyntaxHighlighter
          customStyle={{ minHeight: "100%", margin: 0 }}
          language={language}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
