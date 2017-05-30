const cssimport = require('postcss-import');
const cssnext = require('postcss-cssnext');
const precss = require('precss');

module.exports = {
  plugins: [
    cssimport(),
    precss(),
    cssnext({
      browsers: ['last 5 versions'],
    }),
  ],
};
