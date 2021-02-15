import { useTheme } from "@material-ui/core";
import React, { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import atomOneLight from "react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-light";
import atomOneDark from "react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark";
import classes from "./style.module.css";

export default function Markdown({ children }) {
  const theme = useTheme();
  const darkTheme = useMemo(() => theme.palette.type == "dark", [theme]);

  const renderers = {
    code: ({ language, value }) => {
      return (
        <SyntaxHighlighter
          customStyle={{
            background: darkTheme ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.03)",
          }}
          language={language}
          children={value}
          style={darkTheme ? atomOneDark : atomOneLight}
        />
      );
    },
  };

  return (
    <ReactMarkdown
      className={darkTheme ? classes.dark : ""}
      renderers={renderers}
    >
      {children}
    </ReactMarkdown>
  );
}
