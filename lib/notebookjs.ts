import nb from "notebookjs";
import hljs from "highlight.js";

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

export default async function renderNotebook(code: string) {
  try {
    const notebook = nb.parse(JSON.parse(code));
    const render: HTMLDivElement = notebook.render();
    return render.outerHTML as string;
  } catch {
    return "";
  }
}
