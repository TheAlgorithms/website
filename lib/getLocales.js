/* eslint-disable */
const { i18n } = require("next-i18next");
const locales = require("./locales");

module.exports = function getLocales() {
  if (i18n) {
    return locales.filter((locale) => i18n.languages.includes(locale.code));
  }
  require("dotenv").config();
  return !process.env.VERCEL ||
    (process.env.S3_ACCESS_KEY_ID && process.env.S3_SECRET_ACCESS_KEY)
    ? locales.map((locale) => locale.code)
    : ["en"];
};
