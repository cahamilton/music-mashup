/** @format */

/**
 * Format Wikipedia response data
 * @param {Object} data - Wikipedia response.data
 * @return {{image: (null|string), extract: (null|string), source: string}}
 */
const getFormattedResults = (data) => {
  const { pages } = data.query;
  const firstPage = Object.keys(pages)[0];
  const artist = pages[firstPage];

  return {
    extract: artist.extract,
    image: artist.thumbnail ? artist.thumbnail.source : null,
    source: artist.fullurl,
  };
};

module.exports = getFormattedResults;
