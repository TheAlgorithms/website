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
import useTranslation from "hooks/translation";
import PlayArrow from "@material-ui/icons/PlayArrow";
import { useDarkTheme } from "hooks/darkTheme";
import { XTerm } from "xterm-for-react";
import { FitAddon } from "xterm-addon-fit";
import CodeRunner from "lib/playground/codeRunner";
import PistonCodeRunner from "lib/playground/pistonCodeRunner";
import classes from "./PlaygroundEditor.module.css";

function getMonacoLanguageName(language: string) {
  switch (language) {
    case "c-plus-plus":
      return "cpp";
    case "c-sharp":
      return "cs";
    default:
      return language;
  }
}

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
  const xtermRef = useRef<XTerm>();
  const [ready, setReady] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const codeRunner = useMemo<CodeRunner>(() => {
    const runner = new PistonCodeRunner(xtermRef, t);
    setTimeout(() => {
      runner.load(code, language).then((r) => {
        setReady(true);
        setDisabled(!r);
      });
    });
    return runner;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fitAddon = useMemo(() => new FitAddon(), []);

  useEffect(() => {
    function resizeHandler() {
      fitAddon.fit();
    }
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [fitAddon]);

  useEffect(() => {
    (async () => {
      xtermRef.current.terminal.writeln(`${t("playgroundWelcome")}\n`);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          language={getMonacoLanguageName(language)}
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
          disabled={!ready || disabled}
          onClick={() => {
            setDisabled(true);
            codeRunner.run(code).finally(() => {
              setDisabled(false);
            });
          }}
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
