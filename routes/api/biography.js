/** @format */

const status = require('http-status-codes');
const { get } = require('axios');

const getWikidataId = require('./biography/getWikidataId');
const getWikipediaTitle = require('./biography/getWikipediaTitle');
const isProduction = require('../../helpers/isProduction');
const logger = require('../../logger');

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
    const response = await get(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${wikipediaTitle}`,
    );

    if (!isProduction && debug) {
      return res.status(status.OK).json(response.data);
    }

    const { content_urls: content, extract, thumbnail } = response.data;

    return res.status(status.OK).json({
      error: false,
      data: {
        extract,
        image: thumbnail ? thumbnail.source : null,
        source: content.desktop.page,
      },
    });
  } catch (error) {
    logger.error(error.message);

    return res.status(status.OK).json({
      error: true,
      message: error.message,
    });
  }
};

module.exports = biography;
