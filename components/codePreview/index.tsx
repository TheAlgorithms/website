import { useTheme } from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import classes from "./style.module.css";
import "highlight.js/styles/atom-one-light.css";

export default function CodePreview({ code }) {
  const [hovered, setHovered] = useState(false);
  const theme = useTheme();
  const darkTheme = useMemo(() => theme.palette.type == "dark", [theme]);

  return (
    <div
      className={`${classes.codeContainer}`}
      onClick={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {!hovered && <div className={classes.codeContainerGradient} />}
      <pre
        className={
          hovered ? classes.codeHover + " " + classes.code : classes.code
        }
      >
        <code dangerouslySetInnerHTML={{ __html: code }} />
      </pre>
    </div>
  );
}
