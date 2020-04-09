/** @format */

const status = require('http-status-codes');
const { get } = require('axios');

const getFormattedResults = require('./biography/getFormattedResults');
const getWikidataId = require('./biography/getWikidataId');
const getWikipediaTitle = require('./biography/getWikipediaTitle');
const isProduction = require('../../helpers/isProduction');
const logger = require('../../utilities/logger');

const biography = async (req, res) => {
  const { musicBrainzID } = req.params;
  const { source } = req.body;
  const { debug } = req.query;

  if (!musicBrainzID) {
    return res.status(status.BAD_REQUEST).json({
      error: true,
      message: 'Missing musicBrainzID parameter',
    });
  }

  if (!source) {
    return res.status(status.BAD_REQUEST).json({
      error: true,
      message: 'Missing source body parameter',
    });
  }

  const wikidataId = getWikidataId(source);
  const wikipediaTitle = await getWikipediaTitle(wikidataId);

  try {
    const response = await get(`https://en.wikipedia.org/w/api.php`, {
      params: {
        format: 'json',
        action: 'query',
        titles: wikipediaTitle,
        prop: 'extracts|info|pageimages',
        exintro: true,
        explaintext: true,
        inprop: 'url',
        piprop: 'thumbnail',
        pithumbsize: 700,
      },
    });

    if (!isProduction && debug) {
      return res.status(status.OK).json(response.data);
    }

    return res.status(status.OK).json({
      error: false,
      data: getFormattedResults(response.data),
    });
  } catch (error) {
    logger.error(error);

    return res.status(status.OK).json({
      error: true,
      message: error.message,
    });
  }
};

module.exports = biography;
