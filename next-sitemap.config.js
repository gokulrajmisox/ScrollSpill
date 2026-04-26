import siteMetadata from "./src/utils/siteMetaData";

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: siteMetadata.siteUrl || siteMetadata.default.siteUrl,
  generateRobotsTxt: true,
};
