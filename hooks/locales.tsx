// eslint-disable-next-line import/no-extraneous-dependencies
import { i18n as I18NextClient } from "i18next";
import locales from "lib/locales";

export default function useLocales(i18n: I18NextClient) {
  return locales.filter((locale) => i18n.languages.includes(locale.code));
}
