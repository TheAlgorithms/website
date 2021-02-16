import React, { useState } from "react";
import classes from "./style.module.css";
import "highlight.js/styles/atom-one-light.css";

export default function CodePreview({ code }) {
  const [hovered, setHovered] = useState(false);

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div
      className={`${classes.codeContainer}`}
      onClick={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="document"
    >
      {!hovered && <div className={classes.codeContainerGradient} />}
      <pre
        className={
          hovered ? `${classes.codeHover} ${classes.code}` : classes.code
        }
      >
        {/* eslint-disable-next-line react/no-danger */}
        <code dangerouslySetInnerHTML={{ __html: code }} />
      </pre>
    </div>
  );
}
