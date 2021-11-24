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
    (aliases.algorithms[normalize(st)] || st)
      // From https://stackoverflow.com/a/26188910
      // Look for long acronyms and filter out the last letter
      .replace(/([A-Z]+)([A-Z][a-z])/g, " $1 $2")
      // Look for lower-case letters followed by upper-case letters
      .replace(/([a-z\d])([A-Z])/g, "$1 $2")
      // Look for lower-case letters followed by numbers
      .replace(/([a-zA-Z])(\d)/g, "$1 $2")
      .replace(/^./, (str: string) => str.toUpperCase())
      // Remove any white space left around the word
      .replace(/_/g, " ")
      .trim()
  );
}

export function normalizeCategory(st: string) {
  return aliases.categories[normalize(st)] || st;
}

export function normalizeAlgorithm(st: string) {
  return normalize(aliases.algorithms[normalize(st)] || st);
}
