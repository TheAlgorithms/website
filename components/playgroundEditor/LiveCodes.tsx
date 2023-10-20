import { Dispatch, SetStateAction, useState } from "react";
import type { Config, Language, Playground } from "livecodes";
import LiveCodesPlayground from "livecodes/react";
import { luaTestRunner } from "lib/livecodes";

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

  const getLuaConfig = (luaCode: string, test: string): Partial<Config> => {
    const pattern = /\n\s*local\s+(\S+)\s+=\s+require.*\n/g;
    const matches = test.matchAll(pattern);
    const fnName = [...matches][0]?.[1] || "return";
    const content = `
${luaCode.replace("return", `local ${fnName} =`)}


${test.replace(pattern, "\n")}`.trimStart();

    return {
      ...baseConfig,
      languages: ["lua-wasm"],
      script: {
        language: "lua-wasm",
        content,
        // TODO: this ignore will not be needed in new version of SDK
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        hiddenContent: luaTestRunner,
      },
    };
  };

  const config: Partial<Config> =
    language === "javascript" || language === "typescript"
      ? getJSTSConfig(language, code, tests)
      : language === "python"
      ? getPythonConfig(code)
      : language === "r"
      ? getRConfig(code)
      : language === "ruby"
      ? getRubyConfig(code)
      : language === "lua"
      ? getLuaConfig(code, tests)
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
