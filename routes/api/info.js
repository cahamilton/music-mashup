/** @format */

const { LastFmNode } = require('lastfm');
const utils = require('../../utilities');

const lastfm = new LastFmNode({
  api_key: process.env.LAST_FM_KEY,
  secret: process.env.LAST_FM_SECRET,
});

const info = {};

/**
 * Function to query LastFM API for artist matches
 * @param {String} musicBrainzID - Artist to search for
 */
info.mbid = (musicBrainzID) => {
  return new Promise((resolve, reject) => {
    lastfm.request('artist.getInfo', {
      mbid: musicBrainzID,
      handlers: {
        success: (results) => resolve(info.mbid.successHandler(results)),
        error: (error) => reject(info.mbid.errorHandler(error)),
      },
    });
  });
};

/**
 * Success handler for info.mbid() function
 * @param {Object} data - Object of data from LastFM API call
 * @return {Object} results - Newly formatted results object
 */

info.mbid.successHandler = (data) => ({
  name: data.artist.name,
  mbid: data.artist.mbid,
  image: data.artist.image[3]['#text'],
  genre: utils.titleCase(data.artist.tags.tag[0].name),
  bio: utils.sanitizeContent(data.artist.bio.content),
});

/**
 * Error handler for info.mbid() function
 * @param {Object} error - Object of error data from LastFM API call
 * @return {Object} error - Object of error data
 */
info.mbid.errorHandler = (error) => ({ error: error.message });

module.exports = info;