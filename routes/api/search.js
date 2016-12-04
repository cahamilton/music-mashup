const config = require('../../config');

const LastFmNode = require('lastfm').LastFmNode;
const lastfm = new LastFmNode({
  api_key: config.keys.lastFM.key,
  secret: config.keys.lastFM.secret,
});

const search = {};

/**
 * Function to query LastFM API for artist matches
 * @param {String} artistName - Artist to search for
 * @param {Function} callback - Callback function to pass to handlers
 */
search.artist = (artistName, callback) => {
  lastfm.request('artist.search', {
    artist: artistName,
    handlers: {
      success: (results) => {
        search.artist.successHandler(results, callback);
      },
      error: (error) => {
        search.artist.errorHandler(error, callback);
      },
    },
  });
};

/**
 * Success handler for search.artist() function
 * @param {Object} data - Object of data from LastFM API call
 * @param {Function} callback - Callback function
 * @return {Object} results - Newly formatted results object
 */
search.artist.successHandler = (data, callback) => {
  const searchQuery = data.results['opensearch:Query'].searchTerms;
  const searchMatches = data.results.artistmatches.artist;

  const results = {};
  results.query = searchQuery;
  results.matches = [];

  searchMatches.forEach((match) => {
    // Sieve out bad artist data and only return results that contain a
    // valid MusicBrainz ID
    if (match.mbid) {
      const artistData = search.artist.formatData(match);
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
search.artist.errorHandler = (error, callback) => {
  callback(error);
  return error;
};

/**
 * Returns formatted artist data from LastFM search matches
 * @param {Object} data - Object of artist data returned from LastFM API call
 * @return {Object} artist - Newly formatted object of artist data
 */
search.artist.formatData = (data) => {
  const artist = {};
  artist.name = data.name;
  artist.mbid = data.mbid;

  const thumbnailNormal = data.image[0]['#text'];
  const thumbnailRetina = data.image[1]['#text'];

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
