import fs from "fs";

export default async function getRepositoryStars() {
  return JSON.parse(
    (await fs.promises.readFile("tmp/stars.json")).toString()
  ) as { [key: string]: number };
}
