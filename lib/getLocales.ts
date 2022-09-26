import { i18n } from "next-i18next";
import dotenv from "dotenv";
import locales from "./locales";

dotenv.config();

export default function getLocales() {
  if (i18n) {
    return locales.filter((locale) => i18n.languages.includes(locale.code));
  }
  return !process.env.VERCEL ||
    (process.env.S3_ACCESS_KEY_ID && process.env.S3_SECRET_ACCESS_KEY)
    ? locales.map((locale) => locale.code)
    : ["en"];
}
