import CodeRunner from "./codeRunner";

const API_BASE_URL = "https://emkc.org/api/v2/piston";

function pistonLanguageName(language: string) {
  switch (language) {
    case "c-plus-plus":
      return "c++";
    case "c-sharp":
      return "c#";
    default:
      return language;
  }
}

export default class PistonCodeRunner extends CodeRunner {
  language: string;

  runtimeVersion: string;

  async load(_: string, language: string) {
    this.language = language;
    const runtime = await fetch(`${API_BASE_URL}/runtimes`)
      .then((response) => response.json())
      .then(
        (
          runtimes: {
            language: string;
            version: string;
            aliases: string[];
            runtime?: string;
          }[]
        ) =>
          runtimes.find(
            (x) =>
              x.language === pistonLanguageName(language) ||
              x.aliases.includes(pistonLanguageName(language))
          )
      );
    if (!runtime) {
      this.xtermRef.current.terminal.writeln(
        `There was an error with the Code Runner API, the language ${this.language} doesn't seem to be supported.`
      );
    } else {
      this.runtimeVersion = runtime.version;
      this.xtermRef.current.terminal.writeln(
        `\r${this.t("playgroundReady")}                    \n\x1b[?25l`
      );
    }
    return !!runtime;
  }

  execute(code: string) {
    return fetch(`${API_BASE_URL}/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: pistonLanguageName(this.language),
        version: this.runtimeVersion,
        files: [
          {
            // name: `code${Repositories[this.language].allowedFiles[0]}`,
            content: code,
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then(
        (response: {
          message?: string;
          language: string;
          version: string;
          run: {
            stdout: string;
            stderr: string;
            output: string;
            code: number;
            signal?: string;
          };
        }) => ({
          stdout: response.run?.stdout,
          stderr: response.message || response.run.stderr,
          code: response.run?.code,
        })
      );
  }
}
