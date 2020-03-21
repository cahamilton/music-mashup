/** @format */

/**
 * Filter artists based on various criteria (sorted by score)
 * @param {Array} artists
 * @return {Array}
 */
const getFilteredResults = (artists) => {
  return artists
    .reduce((array, artist) => {
      if (artist.score < 50) {
        return array;
      }

      return [...array, artist];
    }, [])
    .sort((a, b) => b.score - a.score);
};

module.exports = getFilteredResults;
