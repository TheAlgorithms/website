/* eslint-disable */
const path = require("path");
require("dotenv").config()

const locales = require("./lib/locales");
module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: (!process.env.VERCEL || (process.env.S3_ACCESS_KEY_ID && process.env.S3_SECRET_ACCESS_KEY)) ? locales.map((locale) => locale.code) : "en",
    localePath: path.resolve("./public/locales"),
  },
};
