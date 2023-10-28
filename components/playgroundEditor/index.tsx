import { Dispatch, SetStateAction } from "react";
import { isLiveCodesLanguage } from "lib/playground/livecodes";
import LiveCodes from "./LiveCodes";
import PlaygroundEditor from "./PlaygroundEditor";

export default function Editor({
  language,
  code,
  setCode,
  tests,
}: {
  language: string;
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
  tests: string;
}) {
  if (isLiveCodesLanguage(language)) {
    return (
      <LiveCodes
        language={language}
        code={code}
        setCode={setCode}
        tests={tests}
      />
    );
  }
  return <PlaygroundEditor language={language} code={code} setCode={setCode} />;
}
