const siteMetadata = require("./src/utils/siteMetaData");

module.exports = {
    siteUrl: siteMetadata.siteUrl || siteMetadata.default.siteUrl,
    generateRobotsTxt: true,
  }