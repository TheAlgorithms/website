import type { Language as LiveCodesLanguage } from "livecodes";

export type Language = LiveCodesLanguage | "jupyter";

const languages = [
  "javascript",
  "typescript",
  "python",
  "jupyter",
  "r",
  "ruby",
  "lua",
  "php",
  "go",
  "c",
] as const; // satisfies readonly Language[]

export const isLiveCodesLanguage = (
  lang: string
): lang is typeof languages[number] =>
  languages.includes(lang as typeof languages[number]);

export const getTest = (language: string, url: string) => {
  if (
    language !== "javascript" &&
    language !== "typescript" &&
    language !== "lua"
  ) {
    return "";
  }

  const pathname = new URL(url).pathname.slice(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, repo, _type, branch, ...path] = pathname.split("/");
  const [name, extension] = path[path.length - 1].split(".");
  let testUrl = "";

  if (language === "javascript" || language === "typescript") {
    const testPath = `${path
      .slice(0, -1)
      .join("/")}/test/${name}.test.${extension}`;
    testUrl = `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${testPath}`;
  }

  if (language === "lua") {
    const testPath = `.spec/${path
      .slice(1, -1)
      .join("/")}/${name}_spec.${extension}`;
    testUrl = `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${testPath}`;
  }

  try {
    return fetch(testUrl).then((res) => (!res.ok ? "" : res.text()));
  } catch {
    return "";
  }
};

// based on https://gist.github.com/jasper-lyons/53afaeb2c9ca4de135b4f1722d6aa1a9
export const luaTestRunner = `
local function describe(name, descriptor)
  local errors = {}
  local successes = {}

  function it(spec_line, spec)
    local status = xpcall(spec, function (err)
      table.insert(errors, string.format("\\t%s\\n\\t\\t%s\\n", spec_line, err))
    end)

    if status then
      table.insert(successes, string.format("\\t%s\\n", spec_line))
    end
  end

  local status = xpcall(descriptor, function (err)
    table.insert(errors, err)
  end, it)

  print(name)
  if #errors > 0 then
    print('Failures:')
    print(table.concat(errors))
  end

  if #successes > 0 then
    print('Successes:')
    print(table.concat(successes))
  end
end

local originalAssert = assert
local assert = {}
local mt = {}
setmetatable(assert, { __call = function(s, c) return originalAssert(c) end})
assert.equal = function (a, b) return originalAssert(a == b) end

`;
