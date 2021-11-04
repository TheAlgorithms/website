/* eslint-disable no-alert */
import { Button, LinearProgress } from "@material-ui/core";
import Editor from "@monaco-editor/react";
import React, {
  useEffect,
  Dispatch,
  SetStateAction,
  useState,
  useRef,
  useMemo,
} from "react";
import tryLoadPyodide from "lib/pyodide";
import useTranslation from "hooks/translation";
import PlayArrow from "@material-ui/icons/PlayArrow";
import checkWasm from "lib/wasm";
import { useDarkTheme } from "hooks/darkTheme";
import { XTerm } from "xterm-for-react";
import { FitAddon } from "xterm-addon-fit";
import classes from "./style.module.css";

let executeCode: (code: string) => void;
let loading = false;

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
  const xtermRef = useRef<XTerm>();
  const fitAddon = useMemo(() => new FitAddon(), []);

  function resizeHandler() {
    fitAddon.fit();
  }

  useEffect(() => {
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  });

  useEffect(() => {
    (async () => {
      if (loading) return;
      loading = true;
      if (!process.browser) return;
      xtermRef.current.terminal.writeln(`${t("playgroundWelcome")}\n`);
      if (!checkWasm()) {
        setSupported(false);
        setReady(true);
        xtermRef.current.terminal.writeln(t("playgroundUnsupported"));
        return;
      }
      setSupported(true);
      xtermRef.current.terminal.write(
        `${t("playgroundLoadingPackage", {
          package: "python",
        })} ...`
      );
      const pyodide = await tryLoadPyodide();
      globalThis.post_stdout_to_main_thread = (text: string) =>
        xtermRef.current.terminal.write(text);
      globalThis.input_fixed = (s: string) => {
        if (s) globalThis.post_stdout_to_main_thread(s);
        const r = prompt(s);
        globalThis.post_stdout_to_main_thread(`${r}\n`);
        return r;
      };
      pyodide.runPython(
        `from contextlib import redirect_stdout,redirect_stderr
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
redirect_stderr(WriteStream(post_stdout_to_main_thread)).__enter__()
`
      );
      const imports = code.matchAll(/^ *(?:import|from)\s+(\S+)/gm);
      if (imports) {
        for (const match of imports) {
          xtermRef.current.terminal.write(
            `\r${t("playgroundLoadingPackage", {
              package: match[1],
            })} ...              `
          );
          await pyodide.loadPackage(match[1]);
        }
      }
      // eslint-disable-next-line camelcase
      executeCode = (s: string) => {
        xtermRef.current.terminal.writeln(
          `\x1b[0m\x1b[90m---- RESET ----\x1b[0m\x1b[?25l`,
          () => {
            pyodide
              .runPythonAsync(s)
              .then(() => {
                xtermRef.current.terminal.writeln(
                  `\x1b[0m\x1b[90mExited with code 0\x1b[0m\x1b[?25l`
                );
              })
              .catch((e: string) => {
                xtermRef.current.terminal.write(`\x1b[31m${e}\x1b[0m`);
                xtermRef.current.terminal.writeln(
                  `\x1b[0m\x1b[90mExited with code 1\x1b[0m\x1b[?25l`
                );
              });
          }
        );
      };
      xtermRef.current.terminal.writeln(
        `\r${t("playgroundReady")}                    \n\x1b[?25l`
      );
      setReady(true);
    })();
  }, [code, t]);

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
      <div className={classes.output}>
        <XTerm
          className={classes.xterm}
          ref={xtermRef}
          options={{ convertEol: true }}
          addons={[fitAddon]}
          onKey={(event) => {
            if (event.domEvent.ctrlKey && event.domEvent.code === "KeyC") {
              event.domEvent.preventDefault();
              navigator.clipboard.writeText(
                xtermRef.current.terminal.getSelection()
              );
            }
          }}
        />
      </div>
    </div>
  );
}
