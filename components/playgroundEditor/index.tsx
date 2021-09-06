/* eslint-disable no-alert */
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
import useTranslation from "hooks/translation";
import PlayArrow from "@material-ui/icons/PlayArrow";
import checkWasm from "lib/wasm";
import { useDarkTheme } from "hooks/darkTheme";
import classes from "./style.module.css";

let executeCode: (code: string) => void;

export default function PlaygroundEditor({
  language,
  code,
  setCode,
}: {
  language: string;
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
}) {
  const t = useTranslation();
  const [darkTheme] = useDarkTheme();
  const [supported, setSupported] = useState<boolean>(undefined);
  const [ready, setReady] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pyodide, setPyodide] = useState<any>();
  const outputPreRef = createRef<HTMLPreElement>();
  const outputCodeRef = createRef<HTMLElement>();

  useEffect(() => {
    if (typeof supported === "undefined") return;
    const welcome = document.createElement("div");
    welcome.style.maxWidth = "100%";
    welcome.innerText = supported
      ? t("playgroundWelcome")
      : t("playgroundUnsupported");
    outputCodeRef.current.appendChild(welcome);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supported]);

  useEffect(() => {
    (async () => {
      if (!process.browser) return;
      if (checkWasm()) {
        setSupported(true);
        const loadedPyodide = await tryLoadPyodide();
        setPyodide(loadedPyodide);
      } else {
        setSupported(false);
        setReady(true);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!pyodide) return;
      globalThis.post_stdout_to_main_thread = (s: string) => {
        const span = document.createElement("span");
        span.innerText = s;
        outputCodeRef.current.appendChild(span);
      };
      globalThis.input_fixed = (s: string) => {
        globalThis.post_stdout_to_main_thread(s);
        const r = prompt(s);
        globalThis.post_stdout_to_main_thread(`${r}\n`);
        return r;
      };
      pyodide.runPython(
        `from contextlib import redirect_stdout
from js import post_stdout_to_main_thread,input_fixed

input = input_fixed
__builtins__.input = input_fixed
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
      executeCode = (s: string) => {
        try {
          if (outputCodeRef.current.innerHTML)
            outputCodeRef.current.innerHTML += `<span>------------------</span><br />`;
          pyodide.runPython(`${s}`);
        } catch (e) {
          if (outputCodeRef.current.innerHTML)
            outputCodeRef.current.innerHTML += "<br />";
          outputCodeRef.current.innerHTML += `<span class="error">${e}</span>`;
        }
        outputPreRef.current.scrollTo(0, outputPreRef.current.scrollHeight);
      };
      setReady(true);
    })();
  }, [outputCodeRef, outputPreRef, pyodide]);

  return (
    <div className={classes.root}>
      <LinearProgress
        style={{
          opacity: ready ? 0 : 1,
          position: "absolute",
          width: "100%",
          zIndex: 10000,
        }}
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
          theme={darkTheme ? "vs-dark" : "vs-light"}
        />
        <Button
          disabled={!ready || !supported}
          onClick={() => executeCode(code)}
          className={classes.runBtn}
          variant="contained"
          color="primary"
          startIcon={<PlayArrow />}
        >
          {t("playgroundRunCode")}
        </Button>
      </div>
      <pre className={classes.output} ref={outputPreRef}>
        <code ref={outputCodeRef} />
        <div className={classes.scrollAnchor} />
      </pre>
    </div>
  );
}
