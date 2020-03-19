/** @format */

const cssimport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const postcssColorMod = require('postcss-color-mod-function');

//
// TODO: Replace color-mod plugin, removed from Color Module Level 4 specification.
//
module.exports = {
  plugins: [
    cssimport(),
    postcssPresetEnv({
      stage: 0,
      preserve: false,
    }),
    postcssColorMod(),
  ],
};
