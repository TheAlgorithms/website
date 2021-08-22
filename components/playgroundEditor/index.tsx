import { Button, LinearProgress, Typography } from "@material-ui/core";
import Editor from "@monaco-editor/react";
import React, { useEffect, Dispatch, SetStateAction, useState } from "react";
import classes from "./style.module.css";

let executeCode;

export default function PlaygroundEditor({
  language,
  code,
  setCode,
}: {
  language: string;
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
}) {
  const [ready, setReady] = useState(false);
  const [output, setOutput] = useState<string>();

  useEffect(() => {
    delete globalThis.loadPyodide;
    const pyodideLoadScript = document.createElement("script");
    pyodideLoadScript.src =
      "https://cdn.jsdelivr.net/pyodide/v0.18.0/full/pyodide.js";
    pyodideLoadScript.addEventListener("load", async () => {
      if (!process.browser) return;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      /* @ts-ignore */
      const loadedPyodide = await globalThis.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.0/full/",
      });
      globalThis.post_stdout_to_main_thread = (s) => {
        setOutput((o) => (o ? o + s : s));
      };
      loadedPyodide.runPython(
        `from contextlib import redirect_stdout
from js import post_stdout_to_main_thread

__name__ = "__main__"

class WriteStream:
  """A utility class so we can specify our own handlers for writes to sdout, stderr"""

  def __init__(self, write_handler):
    self.write_handler = write_handler

  def write(self, text):
    self.write_handler(text)

redirect_stdout(WriteStream(post_stdout_to_main_thread)).__enter__()
`
      );
      // eslint-disable-next-line camelcase
      executeCode = (s) => {
        try {
          setOutput((o: string) => (o ? `${o}----------------\n` : undefined));
          loadedPyodide.runPython(`${s}`);
        } catch (e) {
          setOutput((o) => (o ? o + e.toString() : e.toString()));
        }
      };
      setReady(true);
    });
    document.body.appendChild(pyodideLoadScript);
  }, []);

  return (
    <>
      <LinearProgress style={{ opacity: ready ? 0 : 1 }} />
      <Typography variant="overline" className={classes.caption}>
        Editor
      </Typography>
      <div className={classes.editor}>
        <Editor
          height={500}
          language={language}
          value={code}
          onChange={setCode}
          theme="vs-dark"
        />
        <Button
          disabled={!ready}
          onClick={() => executeCode(code)}
          className={classes.runBtn}
          variant="contained"
          color="primary"
        >
          Run code
        </Button>
      </div>
      <Typography variant="overline" className={classes.caption}>
        Output
      </Typography>
      <pre className={classes.output}>
        <code>{output}</code>
        <div className={classes.scrollAnchor} />
      </pre>
    </>
  );
}
