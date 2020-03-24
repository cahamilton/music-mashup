/** @format */

const { get } = require('axios');

const logger = require('../../../logger');

/**
 * Return Wikipedia title from a Wikidata ID
 * @param {string} wikidataId - Wikidata ID
 * @return {Promise<string|null>}
 */
const getWikipediaTitle = async (wikidataId) => {
  if (!wikidataId) {
    return null;
  }

  try {
    const response = await get('https://www.wikidata.org/w/api.php', {
      params: {
        action: 'wbgetentities',
        format: 'json',
        ids: wikidataId,
        props: 'sitelinks/urls',
        sitefilter: 'enwiki',
      },
    });

    const { title } = response.data.entities[wikidataId].sitelinks.enwiki;

    return title;
  } catch (error) {
    logger.error(error.message);

    return null;
  }
};

module.exports = getWikipediaTitle;
