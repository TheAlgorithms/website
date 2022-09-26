/* eslint-disable */
const path = require("path");
const getLocales = require("./lib/getLocales");

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: getLocales().map((locale) => locale.code),
    localePath: path.resolve("./public/locales"),
  },
};
