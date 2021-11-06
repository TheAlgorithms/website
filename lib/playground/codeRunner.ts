import { Translator } from "hooks/translation";
import { XTerm } from "xterm-for-react";

export default abstract class CodeRunner {
  protected xtermRef: React.MutableRefObject<XTerm>;

  protected t: Translator;

  ready = false;

  constructor(xtermRef: React.MutableRefObject<XTerm>, t: Translator) {
    this.xtermRef = xtermRef;
    this.t = t;
  }

  abstract load(code: string, language: string): Promise<boolean>;

  run(code: string) {
    return new Promise<void>((resolve) => {
      this.xtermRef.current.terminal.writeln(
        `\x1b[0m\x1b[90m---- RESET ----\x1b[0m\x1b[?25l`,
        () =>
          setTimeout(() => {
            this.execute(code)
              .then((result) => {
                if (result.stdout)
                  this.xtermRef.current.terminal.write(result.stdout);
                if (result.stderr)
                  this.xtermRef.current.terminal.write(
                    `\x1b[0m\x1b[31m${result.stderr}\x1b[0m\x1b[?25l`
                  );
                this.xtermRef.current.terminal.writeln(
                  `\x1b[0m\x1b[90mExited with code ${result.code}\x1b[0m\x1b[?25l`
                );
              })
              .catch((error: string) => {
                this.xtermRef.current.terminal.write(`\x1b[31m${error}\x1b[0m`);
                this.xtermRef.current.terminal.writeln(
                  `\x1b[0m\x1b[90mExited with code 1\x1b[0m\x1b[?25l`
                );
              })
              .finally(() => resolve());
          }, 50)
      );
    });
  }

  abstract execute(
    code: string
  ): Promise<{ stdout?: string; stderr?: string; code: number }>;
}
