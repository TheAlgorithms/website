/* eslint-disable */
const path = require("path");
const getLocales = require("./getLocales")

const locales = require("./lib/locales");
module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: getLocales(),
    localePath: path.resolve("./public/locales"),
  },
};
