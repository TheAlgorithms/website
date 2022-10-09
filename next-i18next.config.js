/* eslint-disable */
const path = require("path");
const process = require("process");

const locales = require("./lib/locales");
module.exports = {
  i18n: {
    defaultLocale: "en",
    locales:
      (process.env.S3_ACCESS_KEY_ID && process.env.S3_SECRET_ACCESS_KEY) ||
      !process.env.VERCEL
        ? locales.map((locale) => locale.code)
        : ["en"],
    localePath: path.resolve("./public/locales"),
  },
};
