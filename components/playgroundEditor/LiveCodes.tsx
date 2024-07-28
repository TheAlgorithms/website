import { Dispatch, SetStateAction, useEffect, useState } from "react";
import type { Config, Playground } from "livecodes";
import LiveCodesPlayground from "livecodes/react";
import { luaTestRunner, type Language } from "lib/playground/livecodes";
import { useDarkTheme } from "hooks/darkTheme";

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
  const [playground, setPlayground] = useState<Playground | undefined>();
  const [darkTheme] = useDarkTheme();

  const onReady = (sdk: Playground) => {
    setPlayground(sdk);
    sdk.watch("ready", async () => {
      await sdk.run();
      if (language === "javascript" || language === "typescript") {
        await sdk.runTests();
      }
    });
    sdk.watch("code", (changed) => {
      setCode(changed.code.script.content);
    });
  };

  useEffect(() => {
    playground?.setConfig({ theme: darkTheme ? "dark" : "light" });
  }, [playground, darkTheme]);

  const baseConfig: Partial<Config> = {
    autoupdate: false,
    languages: [language === "jupyter" ? "python-wasm" : language],
    script: {
      language: language === "jupyter" ? "python-wasm" : language,
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
      languages: ["python-wasm"],
      script: {
        language: "python-wasm",
        content: addTestRunner(pyCode),
        title: "Python",
      },
    };
  };

  const getJupyterConfig = (jsonCode: string): Partial<Config> => {
    const getPyCode = (src: string) => {
      try {
        const nb: {
          cells: Array<{ ["cell_type"]: string; source: string[] }>;
        } = JSON.parse(src);
        return nb.cells
          .filter((c) => c.cell_type === "code")
          .map((c) => c.source.join(""))
          .join("\n\n");
      } catch {
        return "";
      }
    };
    return {
      ...baseConfig,
      languages: ["python-wasm"],
      script: {
        language: "python-wasm",
        content: getPyCode(jsonCode),
        title: "Python",
      },
      tools: {
        enabled: ["console"],
        active: "console",
        status: "open",
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
        hiddenContent: luaTestRunner,
        title: "Lua",
      },
    };
  };

  const getPhpConfig = (phpCode: string): Partial<Config> => ({
    ...baseConfig,
    languages: ["php-wasm"],
    script: {
      language: "php-wasm",
      content: phpCode,
      title: "PHP",
    },
    tools: {
      enabled: ["console"],
      active: "console",
      status: "open",
    },
  });

  const getCConfig = (cCode: string): Partial<Config> => ({
    ...baseConfig,
    languages: ["cpp-wasm"],
    script: {
      language: "cpp-wasm",
      content: cCode,
      title: "C",
    },
  });

  const config: Partial<Config> =
    language === "javascript" || language === "typescript"
      ? getJSTSConfig(language, code, tests)
      : language === "python"
      ? getPythonConfig(code)
      : language === "jupyter"
      ? getJupyterConfig(code)
      : language === "r"
      ? getRConfig(code)
      : language === "ruby"
      ? getRubyConfig(code)
      : language === "lua"
      ? getLuaConfig(code, tests)
      : language === "php"
      ? getPhpConfig(code)
      : language === "c"
      ? getCConfig(code)
      : baseConfig;

  return (
    <LiveCodesPlayground
      appUrl="https://v34.livecodes.io/"
      loading="eager"
      config={config}
      style={{ borderRadius: "0", resize: "none" }}
      sdkReady={onReady}
    />
  );
}
