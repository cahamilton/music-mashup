/** @format */

const { get } = require('axios');

const logger = require('../../../logger');

/**
 * Format results returned from playlist search
 * @param {Array} items
 * @return {Object} results
 */
const formatResults = (items) => {
  return items.map((result) => {
    const { resourceId, title, thumbnails } = result.snippet;

    return {
      id: resourceId.videoId,
      title,
      thumbnail: {
        '1x': thumbnails.medium.url,
        '2x': thumbnails.standard.url,
      },
    };
  });
};

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
          maxResults: 5,
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
      results: formatResults(items),
    };
  } catch (error) {
    logger.error(error.message);

    return false;
  }
};

module.exports = getYouTubePlaylistItems;
