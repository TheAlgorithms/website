import tryLoadPyodide, { Pyodide } from "lib/pyodide";
import checkWasm from "lib/wasm";
import CodeRunner from "./codeRunner";

export default class PythonCodeRunner extends CodeRunner {
  private pyodide: Pyodide;

  async load(code: string) {
    if (!checkWasm()) {
      this.xtermRef.current.terminal.writeln(this.t("playgroundUnsupported"));
      return false;
    }
    this.xtermRef.current.terminal.write(
      `${this.t("playgroundLoadingPackage", {
        package: "python",
      })} ...`
    );
    this.pyodide = await tryLoadPyodide();
    globalThis.post_stdout_to_main_thread = (text: string) =>
      this.xtermRef.current.terminal.write(text);
    globalThis.input_fixed = (s: string) => {
      if (s) globalThis.post_stdout_to_main_thread(s);
      // eslint-disable-next-line no-alert
      const r = prompt(s);
      globalThis.post_stdout_to_main_thread(`${r}\n`);
      return r;
    };
    this.pyodide.runPython(
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
        this.xtermRef.current.terminal.write(
          `\r${this.t("playgroundLoadingPackage", {
            package: match[1],
          })} ...              `
        );
        await this.pyodide.loadPackage(match[1]);
      }
    }
    // eslint-disable-next-line camelcase
    this.xtermRef.current.terminal.writeln(
      `\r${this.t("playgroundReady")}                    \n\x1b[?25l`
    );
    return true;
  }

  async execute(code: string) {
    return {
      stdout: await this.pyodide.runPythonAsync(code),
      code: 0,
    };
  }
}
