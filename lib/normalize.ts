import { titleCase } from "title-case";
import aliases from "./aliases";

export function normalize(st: string) {
  return st
    .normalize()
    .toLowerCase()
    .replace(/%20/g, " ")
    .replace(/[^a-z0-9]/g, "");
}

export function normalizeWeak(st: string) {
  return (
    st
      .normalize()
      .toLowerCase()
      .replace(/%20/g, " ")
      .replace(/_/g, "-")
      .replace(/ /g, "-")
      // eslint-disable-next-line no-useless-escape
      .replace(/[^a-z0-9\-]/g, "")
  );
}

export function normalizeLanguage(st: string) {
  return (
    st
      .normalize()
      .toLowerCase()
      .replace(/%20/g, " ")
      .replace(/ /g, "-")
      // eslint-disable-next-line no-useless-escape
      .replace(/[^a-z0-9\-_]/g, "")
  );
}

export function normalizeTitle(st: string) {
  return titleCase(
    (aliases.algorithms[normalize(st)] || st).replace(/_/g, " ")
  );
}

export function normalizeCategory(st: string) {
  return aliases.categories[normalize(st)] || st;
}

export function normalizeAlgorithm(st: string) {
  return aliases.algorithms[normalize(st)] || normalize(st);
}
