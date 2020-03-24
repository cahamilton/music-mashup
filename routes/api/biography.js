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

    const { pages } = response.data.query;
    const firstPage = Object.keys(pages)[0];
    const artist = pages[firstPage];

    return res.status(status.OK).json({
      error: false,
      data: {
        extract: artist.extract,
        image: artist.thumbnail ? artist.thumbnail.source : null,
        source: artist.fullurl,
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
