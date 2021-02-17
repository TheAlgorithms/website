import hljs from "highlight.js";

export default function highlightCode(code: string, language: string) {
  const result = hljs.highlight(
    language
      .toLowerCase()
      .replace("c-plus-plus", "cpp")
      .replace("c-sharp", "cs")
      .replace("f-sharp", "fs")
      .replace("aarch64_assembly", "arm")
      .replace("jupyter", "json")
      .replace("matlab-octave", "matlab"),
    code,
    true
  ).value;
  return result;
}
