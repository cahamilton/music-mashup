/** @format */

/**
 * Return Wikidata ID from URL string
 * @param {string} url - Wikidata URL
 * @return {string|null}
 */
const getWikidataId = (url) => {
  const id = url.split('/wiki/')[1];

  if (!id) {
    return null;
  }

  return id;
};

module.exports = getWikidataId;
