import fs from "fs";
import path from "path";
import { DATA_DIR } from "./constants";

export default async function getRepositoryStars() {
  return JSON.parse(
    (await fs.promises.readFile(path.join(DATA_DIR, "stars.json"))).toString()
  ) as { [key: string]: number };
}
