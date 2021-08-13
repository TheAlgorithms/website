// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import algorithms from "public/data/algorithms-min.json";
import useTranslation from "hooks/translation";
import { normalize } from "lib/normalize";
import type { Algorithm } from "lib/models";

export default function useSearch(query: string, limit?: number) {
  const t = useTranslation();

  if (!query) return [];
  const result = algorithms.filter(
    (algorithm: Algorithm) =>
      query
        .split(" ")
        .every((x) => normalize(algorithm.name).includes(normalize(x))) ||
      algorithm.categories.some((category) =>
        normalize(t(`categories:${category}`)).includes(normalize(query))
      )
  );
  if (limit) return result.slice(0, limit);
  return result;
}
