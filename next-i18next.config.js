/* eslint-disable */
const path = require("path");

const locales = require("./lib/locales");
module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: locales.map((locale) => locale.code),
    localePath: path.resolve("./public/locales"),
  },
};
