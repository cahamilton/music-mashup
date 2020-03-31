/** @format */

const { get } = require('axios');

const logger = require('../../../logger');
const getFormattedResults = require('./getFormattedResults');

/**
 * Get playlist items from playlistId
 * @param {String} playlistId - YouTube playlistId
 * @return {Promise<object|boolean>}
 */
const getYouTubePlaylistItems = async (playlistId) => {
  try {
    const response = await get(
      'https://www.googleapis.com/youtube/v3/playlistItems',
      {
        params: {
          key: process.env.YOUTUBE_KEY,
          part: 'snippet',
          maxResults: 6,
          playlistId,
        },
      },
    );

    const { items, nextPageToken } = response.data;

    if (!items.length) {
      return false;
    }

    return {
      playlistId,
      nextPage: nextPageToken,
      items: getFormattedResults(items),
    };
  } catch (error) {
    logger.error(error);

    return false;
  }
};

module.exports = getYouTubePlaylistItems;
