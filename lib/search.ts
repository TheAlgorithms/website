import algorithms from "cache/algorithms.json";
import { normalize } from "./normalize";
import type { Algorithm } from "./models";

export default function search(query: string, limit?: number) {
  if (!query) return [];
  const result = algorithms.filter(
    (algorithm: Algorithm) =>
      normalize(algorithm.name).includes(normalize(query)) ||
      algorithm.categories.filter((category) =>
        normalize(category).includes(normalize(query))
      ).length !== 0
  );
  if (limit) return result.slice(0, limit);
  return result;
}
