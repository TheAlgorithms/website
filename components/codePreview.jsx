import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { makeStyles } from "@material-ui/core/styles";
import { Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  codeContainer: {
    position: "relative",
  },
  code: {
    transition: "height 0.3s ease, margin-bottom 0.3s ease",
    height: 350,
    overflow: "hidden",
    cursor: "pointer",
  },
  codeHover: {
    height: 500,
    overflow: "auto",
    marginBottom: "1em",
    cursor: "unset",
  },
  codeContainerGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(180deg, rgba(255,255,255,0) 50%, rgba(250,250,250,1) 100%)",
    pointerEvents: "none",
  },
}));

export default function CodePreview({ code, language }) {
  const [hovered, setHovered] = useState(false);
  const classes = useStyles();

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
