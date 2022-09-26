/* eslint-disable */
const locales = require("./locales");

module.exports = function getLocales(i18n = undefined) {
  if (i18n) {
    return locales.filter((locale) => i18n.languages.includes(locale.code));
  }
  if (
    !process.env.VERCEL ||
    (process.env.S3_ACCESS_KEY_ID && process.env.S3_SECRET_ACCESS_KEY)
  )
    return locales;
  return [locales[0]];
};
