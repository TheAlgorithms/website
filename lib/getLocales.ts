import { i18n } from "next-i18next";
import locales from "./locales";

export default function getLocales() {
  return locales.filter((locale) => i18n.languages.includes(locale.code));
}
