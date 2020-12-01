import algorithms from "../cache/algorithms.json";
import { normalize } from "./normalize";
import type { Algorithm } from "./models";

export default function search(query: string) {
  return query
    ? algorithms.filter((algorithm: Algorithm) =>
        normalize(algorithm.name).includes(normalize(query))
      )
    : [];
}
