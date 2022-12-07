import fs from "fs";
import path from "path";
import { S3 } from "./aws";
import { DATA_DIR } from "./constants";

export async function* walk(dir: string): AsyncGenerator<string> {
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

export async function dataGetFile(filename: string) {
  const s3 = S3();
  try {
    if (s3) {
      return (
        await s3.getObject({ Bucket: "thealgorithms", Key: filename }).promise()
      ).Body.toString("utf-8");
    }
    return (
      await fs.promises.readFile(path.join(DATA_DIR, filename))
    ).toString();
  } catch (e) {
    return undefined;
  }
}

export async function dataGetDir(directory: string) {
  const s3 = S3();
  if (s3) {
    let prefix = directory;
    if (!prefix.endsWith("/")) prefix += "/";
    return (
      await s3
        .listObjects({ Bucket: "thealgorithms", Prefix: prefix })
        .promise()
    ).Contents.map((x) => x.Key.slice(prefix.length));
  }
  return fs.promises.readdir(path.join(DATA_DIR, directory));
}
