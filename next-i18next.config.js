/* eslint-disable */
const locales = require("./lib/locales");
module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: locales.map((locale) => locale.code),
  },
};
