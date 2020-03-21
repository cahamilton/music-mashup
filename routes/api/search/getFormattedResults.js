/** @format */

/**
 * Reformat artist data
 * @param {Array} artists
 * @return {Array}
 */
const getFormattedResults = (artists) => {
  return artists.map(({ name, id, disambiguation }) => ({
    name,
    mbid: id,
    disambiguation,
  }));
};

module.exports = getFormattedResults;
