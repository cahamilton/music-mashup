/** @format */

const { author, name, version } = require('../../../package.json');

const musicBrainzConfig = {
  appName: name,
  appVersion: version,
  appContactInfo: author,
};

module.exports = musicBrainzConfig;
