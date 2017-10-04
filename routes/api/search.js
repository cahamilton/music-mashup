const LastFmNode = require('lastfm').LastFmNode;

const lastfm = new LastFmNode({
  api_key: process.env.LAST_FM_KEY,
  secret: process.env.LAST_FM_SECRET,
});

const search = {};

/**
 * Function to query LastFM API for artist matches
 * @param {String} artistName - Artist to search for
 */
search.artist = artistName => new Promise((resolve, reject) => {
  lastfm.request('artist.search', {
    artist: artistName,
    handlers: {
      success: results => resolve(search.artist.successHandler(results)),
      error: error => reject(search.artist.errorHandler(error)),
    },
  });
});

/**
 * Success handler for search.artist() function
 *
 * Uses Array.filter and Array.map to filter out bad artist data. Will only return results that
 * contain a valid MusicBrainz ID
 *
 * @param {Object} data - Object of data from LastFM API call
 * @return {Object} results - Newly formatted results object
 */

search.artist.successHandler = data => ({
  query: data.results['opensearch:Query'].searchTerms,
  matches: (
    data.results.artistmatches.artist
      .filter(artist => artist.mbid)
      .map(artist => search.artist.formatData(artist))
  ),
});

/**
 * Error handler for search.artist() function
 * @param {Object} error - Object of error data from LastFM API call
 * @return {Object} error - Object of error data
 */
search.artist.errorHandler = error => ({error: error.message});

/**
 * Returns formatted artist data from LastFM search matches
 * @param {Object} data - Object of artist data returned from LastFM API call
 * @return {Object} artist - Newly formatted object of artist data
 */
search.artist.formatData = (data) => {
  const normal = data.image[0]['#text'];
  const retina = data.image[1]['#text'];

  return JSON.parse(JSON.stringify({
    name: data.name,
    mbid: data.mbid,
    thumbnail: (
      normal || retina ? {
        '1x': normal || undefined,
        '2x': retina || undefined,
      } : undefined
    ),
  }));
};

module.exports = search;
