import { Dispatch, SetStateAction, useState } from "react";
import type { Config, Language, Playground } from "livecodes";
import LiveCodesPlayground from "livecodes/react";

const languages = ["javascript", "typescript", "python", "r", "ruby"] as const;

export const isLiveCodesLanguage = (
  lang: string
): lang is typeof languages[number] =>
  languages.includes(lang as typeof languages[number]);

export default function LiveCodes({
  language,
  code,
  setCode,
  tests,
}: {
  language: Language;
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
  tests: string;
}) {
  const [playground, setPlayground] = useState<Playground>();

  const onReady = (sdk: Playground) => {
    setPlayground(sdk);
    setTimeout(() => {
      playground?.run();
      playground?.watch("code", (changed) => {
        setCode(changed.code.script.content);
      });
    });
  };

  const baseConfig: Partial<Config> = {
    languages: [language],
    script: {
      language,
      content: code,
    },
    tools: {
      enabled: ["console"],
      active: "console",
      status: "full",
    },
  };

  const getJSTSConfig = (
    lang: "javascript" | "typescript",
    jsCode: string,
    test: string
  ): Partial<Config> => {
    const editTest = (src: string) =>
      src.replace(
        /import\s+((?:.|\s)*?)\s+from\s+('|").*?('|")/g,
        "import $1 from './script'"
      );
    return {
      ...baseConfig,
      script: {
        language: lang,
        content: jsCode,
      },
      tests: {
        language: lang,
        content: editTest(test),
      },
      tools: {
        enabled: [
          "console",
          "tests",
          ...(lang === "typescript" ? ["compiled"] : []),
        ] as Config["tools"]["enabled"],
        active: "tests",
        status: "full",
      },
      autotest: true,
    };
  };

  const getPythonConfig = (pyCode: string): Partial<Config> => {
    const addTestRunner = (src: string) => {
      const sep = 'if __name__ == "__main__":\n';
      const [algCode, run] = src.split(sep);
      const comment =
        run
          ?.split("\n")
          .map((line) => `# ${line}`)
          .join("\n") || "";
      const testRunner = `\n    import doctest\n    doctest.testmod(verbose=True)`;
      return `${algCode}${sep}${comment}${testRunner}`;
    };
    return {
      ...baseConfig,
      languages: ["pyodide"],
      script: {
        language: "pyodide",
        content: addTestRunner(pyCode),
      },
    };
  };

  const getRConfig = (rCode: string): Partial<Config> => {
    const editCode = (src: string) =>
      src.replace(/# Example:\n# /g, "# Example:\n");
    return {
      ...baseConfig,
      script: {
        language: "r",
        content: editCode(rCode),
      },
      tools: {
        enabled: ["console"],
        active: "console",
        status: "open",
      },
    };
  };

  const getRubyConfig = (rubyCode: string): Partial<Config> => ({
    ...baseConfig,
    script: {
      language: "ruby",
      content: rubyCode,
    },
  });

  const config: Partial<Config> =
    language === "javascript" || language === "typescript"
      ? getJSTSConfig(language, code, tests)
      : language === "python"
      ? getPythonConfig(code)
      : language === "r"
      ? getRConfig(code)
      : language === "ruby"
      ? getRubyConfig(code)
      : baseConfig;

  return (
    <LiveCodesPlayground
      appUrl="https://dev.livecodes.io/"
      config={config}
      style={{ borderRadius: "0", resize: "none" }}
      sdkReady={onReady}
    />
  );
}
