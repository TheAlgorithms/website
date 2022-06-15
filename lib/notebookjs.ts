import nb from "notebookjs";
import hljs from "highlight.js";
import { marked } from "marked";
import AnsiUp from "ansi_up";

const ansiUp = new AnsiUp();

nb.highlighter = (
  text: string,
  pre: HTMLPreElement,
  code: HTMLElement,
  lang: string
) => {
  if (code) code.classList.add("hljs");
  return lang
    ? hljs.highlight(text, { language: lang }).value
    : hljs.highlightAuto(text).value;
};
nb.markdown = marked;
nb.ansi = (txt: string) => ansiUp.ansi_to_html(txt);

export default async function renderNotebook(code: string) {
  const notebook = nb.parse(JSON.parse(code));
  const render: HTMLDivElement = notebook.render();
  return render.outerHTML as string;
}
