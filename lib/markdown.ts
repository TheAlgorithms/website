import unified from "unified";
import remark from "remark-parse";
import gfm from "remark-gfm";
import rehype from "remark-rehype";
import highlight from "rehype-highlight";
import html from "rehype-stringify";

export default async function renderMarkdown(markdown: string) {
  return String(
    await unified()
      .use(remark)
      .use(gfm)
      .use(rehype)
      .use(highlight, { ignoreMissing: true })
      .use(html)
      .process(markdown)
  );
}
