import nb from "notebookjs";
import hljs from "highlight.js";
import { fetchCode } from "./algorithms";
import { Algorithm } from "./models";

nb.highlighter = (
  text: string,
  pre: HTMLPreElement,
  code: HTMLElement,
  lang: string
) => {
  if (code) code.classList.add("hljs");
  return lang
    ? hljs.highlight(lang, text).value
    : hljs.highlightAuto(text).value;
};

export default async function renderNotebook(algorithm: Algorithm) {
  try {
    const code = await fetchCode(algorithm.implementations.jupyter);
    const notebook = nb.parse(JSON.parse(code));
    const render: HTMLDivElement = notebook.render();
    return render.outerHTML as string;
  } catch {
    return "";
  }
}
