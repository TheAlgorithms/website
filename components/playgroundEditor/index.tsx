import { Button } from "@material-ui/core";
import Editor from "@monaco-editor/react";
import { useEffect, Dispatch, SetStateAction, useState } from "react";

export default function PlaygroundEditor({
  language,
  code,
  setCode,
}: {
  language: string;
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
}) {
  const [pyodide, setPyodide] = useState<any>();
  const [output, setOutput] = useState();

  useEffect(() => {
    const pyodideLoadScript = document.createElement("script");
    pyodideLoadScript.src =
      "https://cdn.jsdelivr.net/pyodide/v0.18.0/full/pyodide.js";
    pyodideLoadScript.addEventListener("load", async () => {
      setPyodide(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        /* @ts-ignore */
        loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.0/full/",
        })
      );
    });
    document.body.appendChild(pyodideLoadScript);
  }, []);

  function runCode() {
    setOutput(pyodide?.runPython(code));
  }

  return (
    <>
      <Editor
        height={700}
        language={language}
        value={code}
        onChange={setCode}
      />
      <Button disabled={!pyodide} onClick={() => runCode()}>
        Run code
      </Button>
      <pre>
        <code>{output}</code>
      </pre>
    </>
  );
}
