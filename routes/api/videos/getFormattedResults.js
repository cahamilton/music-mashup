/** @format */

/**
 * Format results returned from playlist search
 * @param {Array} items
 * @return {Object} results
 */
const getFormattedResults = (items) => {
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

module.exports = getFormattedResults;
