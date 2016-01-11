var config = require('../../config');

var LastFmNode = require('lastfm').LastFmNode;
var lastfm = new LastFmNode({
  api_key: config.keys.lastFM.key,
  secret: config.keys.lastFM.secret
});

var search = {};

/**
 * Function to query LastFM API for artist matches
 * @param {String} artistName - Artist to search for
 * @param {Function} callback - Callback function to pass to handlers
 */
search.artist = function(artistName, callback) {
  lastfm.request('artist.search', {
    artist: artistName,
    handlers: {
      success: function(results) {
        search.artist.successHandler(results, callback);
      },
      error: function(error) {
        search.artist.errorHandler(error, callback);
      }
    }
  });
};

/**
 * Success handler for search.artist() function
 * @param {Object} data - Object of data from LastFM API call
 * @param {Function} callback - Callback function
 * @return {Object} results - Newly formatted results object
 */
search.artist.successHandler = function(data, callback) {
  var searchQuery = data.results['opensearch:Query'].searchTerms;
  var searchMatches = data.results.artistmatches.artist;

  var results = {};
  results.query = searchQuery;
  results.matches = [];

  searchMatches.forEach(function(match) {
    // Sieve out bad artist data and only return results that contain a
    // valid MusicBrainz ID
    if (match.mbid) {
      var artistData = search.artist.formatData(match);
      results.matches.push(artistData);
    }
  });

  callback(results);
  return results;
};

/**
 * Error handler for search.artist() function
 * @param {Object} error - Object of error data from LastFM API call
 * @param {Function} callback - Callback function
 * @return {Object} error - Object of error data
 */
search.artist.errorHandler = function(error, callback) {
  callback(error);
  return error;
};

/**
 * Returns formatted artist data from LastFM search matches
 * @param {Object} data - Object of artist data returned from LastFM API call
 * @return {Object} artist - Newly formatted object of artist data
 */
search.artist.formatData = function(data) {
  var artist = {};
  artist.name = data.name;
  artist.mbid = data.mbid;

  var thumbnailNormal = data.image[0]['#text'];
  var thumbnailRetina = data.image[1]['#text'];

  if (thumbnailNormal !== '') {
    artist.thumbnail = {};
    artist.thumbnail['1x'] = thumbnailNormal;

    if (thumbnailRetina !== '') {
      artist.thumbnail['2x'] = thumbnailRetina;
    }
  }

  return artist;
};

module.exports = search;
