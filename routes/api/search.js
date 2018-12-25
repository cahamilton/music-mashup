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
 * @param {Object} data - Object of data from LastFM API call
 * @return {Object} results - Newly formatted results object
 */
search.artist.successHandler = (data) => {
  const query = data.results['opensearch:Query'].searchTerms;
  const artists = search.artist.filterMatches(data.results.artistmatches.artist);
  const matches = artists.map(artist => search.artist.formatData(artist));

  return ({ query, matches });
};

/**
 * Error handler for search.artist() function
 * @param {Object} error - Object of error data from LastFM API call
 * @return {Object} error - Object of error data
 */
search.artist.errorHandler = error => ({ error: error.message });

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

/**
 * Return filtered artists matches - only return items with a valid and unique MusicBrainz ID
 * @param {Array} matches - Array of artist matches
 * @returns {Array}
 */
search.artist.filterMatches = (matches) => {
  const mbids = [];

  return matches
    .filter(artist => artist.mbid)
    .filter((artist) => {
      if (mbids.includes(artist.mbid)) {
        return false;
      }
      mbids.push(artist.mbid);
      return true;
    });
};

module.exports = search;
