var config = require('../../config');

var LastFmNode = require('lastfm').LastFmNode;
var lastfm = new LastFmNode({
  api_key: config.keys.lastFM.key,
  secret: config.keys.lastFM.secret
});

var search = {};

module.exports = search;
