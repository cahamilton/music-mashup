/** @format */

// Disable for generated asset
// eslint-disable-next-line import/no-unresolved
const manifest = require('../rev-manifest.json');

const isProduction = require('../helpers/isProduction');

/**
 * @param filename
 * @return {string}
 */
const getAssetPath = (filename) => {
  const basePath = isProduction ? '/' : 'http://localhost:8080/';

  if (!manifest[filename]) {
    return `${basePath}${filename}`;
  }

  return `${basePath}${manifest[filename]}`;
};

module.exports = getAssetPath;
