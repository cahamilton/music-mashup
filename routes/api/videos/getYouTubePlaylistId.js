/** @format */

const { get } = require('axios');

const logger = require('../../../logger');

/**
 * Get YouTube upload playlist
 * @todo Look at video pagination using pageTokens
 * @param {String} username - YouTube username
 * @return {Promise<string|boolean>}
 */
const getYouTubePlaylistId = async (username) => {
  try {
    const response = await get(
      'https://www.googleapis.com/youtube/v3/channels',
      {
        params: {
          key: process.env.YOUTUBE_KEY,
          part: 'contentDetails',
          forUsername: username,
        },
      },
    );

    const { items } = response.data;

    if (!items.length) {
      return false;
    }

    const { uploads } = items[0].contentDetails.relatedPlaylists;

    return uploads;
  } catch (error) {
    logger.error(error);

    return false;
  }
};

module.exports = getYouTubePlaylistId;
