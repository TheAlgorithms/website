import { Button, LinearProgress } from "@material-ui/core";
import Editor from "@monaco-editor/react";
import React, {
  useEffect,
  Dispatch,
  SetStateAction,
  useState,
  createRef,
} from "react";
import tryLoadPyodide from "lib/pyodide";
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
  const outputRef = createRef<HTMLPreElement>();

  useEffect(() => {
    outputRef.current.scrollTo(0, outputRef.current.scrollHeight);
  }, [output, outputRef]);

  useEffect(() => {
    if (!process.browser) return;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    /* @ts-ignore */
    (async () => {
      const pyodide = await tryLoadPyodide();
      globalThis.post_stdout_to_main_thread = (s) => {
        setOutput((o) => (o ? o + s : s));
      };
      pyodide.runPython(
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
          pyodide.runPython(`${s}`);
        } catch (e) {
          setOutput((o) => (o ? o + e.toString() : e.toString()));
        }
      };
      setReady(true);
    })();
  }, []);

  return (
    <div className={classes.root}>
      <LinearProgress
        style={{ opacity: ready ? 0 : 1, position: "absolute" }}
      />
      <div className={classes.editor}>
        <Editor
          language={language}
          value={code}
          onChange={setCode}
          options={{
            automaticLayout: true,
            padding: {
              top: 15,
              bottom: 15,
            },
          }}
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
      <pre className={classes.output} ref={outputRef}>
        <code>{output}</code>
        <div className={classes.scrollAnchor} />
      </pre>
    </div>
  );
}
