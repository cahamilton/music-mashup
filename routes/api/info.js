const config = require('../../config');
const LastFmNode = require('lastfm').LastFmNode;

const lastfm = new LastFmNode({
  api_key: config.keys.lastFM.key,
  secret: config.keys.lastFM.secret,
});

const info = {};

/**
 * Function to query LastFM API for artist matches
 * @param {String} musicBrainzID - Artist to search for
 */
info.mbid = musicBrainzID => new Promise((resolve, reject) => {
  lastfm.request('artist.getInfo', {
    mbid: musicBrainzID,
    handlers: {
      success: results => resolve(info.mbid.successHandler(results)),
      error: error => reject(info.mbid.errorHandler(error)),
    },
  });
});

/**
 * Success handler for info.mbid() function
 * @param {Object} data - Object of data from LastFM API call
 * @return {Object} results - Newly formatted results object
 */

info.mbid.successHandler = data => ({
  name: data.artist.name,
  mbid: data.artist.mbid,
  image: data.artist.image[3]['#text'],
  genre: data.artist.tags.tag[0].name,
  bio: data.artist.bio.content,
});

/**
 * Error handler for info.mbid() function
 * @param {Object} error - Object of error data from LastFM API call
 * @return {Object} error - Object of error data
 */
info.mbid.errorHandler = error => ({ error: error.message });

module.exports = info;
