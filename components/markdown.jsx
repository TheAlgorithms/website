import React from "react";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";

const renderers = {
  code: ({ language, value }) => {
    return <SyntaxHighlighter language={language} children={value} />;
  },
};

export default function Markdown({ children }) {
  return <ReactMarkdown renderers={renderers}>{children}</ReactMarkdown>;
}
