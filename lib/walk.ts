import fs from "fs";
import path from "path";

export default async function* walk(dir: string): AsyncGenerator<string> {
  for await (const d of await fs.promises.opendir(dir)) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory()) yield* walk(entry);
    else if (d.isFile()) yield entry;
  }
}

export async function asyncWalk(dir: string) {
  const ret: string[] = [];
  for await (const file of walk(dir)) {
    ret.push(file);
  }
  return ret;
}
