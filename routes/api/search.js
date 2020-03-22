/** @format */

const status = require('http-status-codes');
const { MusicBrainzApi } = require('musicbrainz-api');

const getFilteredResults = require('./search/getFilteredResults');
const getFormattedResults = require('./search/getFormattedResults');
const isProduction = require('../../helpers/isProduction');
const logger = require('../../logger');
const musicBrainzConfig = require('./config/musicBrainz');

const search = async (req, res) => {
  const { debug } = req.query;
  const { artistName } = req.params;

  if (!artistName) {
    return res.status(status.BAD_REQUEST).json({
      error: true,
      message: 'Missing artistName parameter',
    });
  }

  try {
    const mbApi = new MusicBrainzApi(musicBrainzConfig);
    const mbSearch = await mbApi.search('artist', artistName, 0, 20);

    if (!isProduction && debug) {
      return res.status(status.OK).json(mbSearch);
    }

    const artistsFiltered = getFilteredResults(mbSearch.artists);
    const artistsFormatted = getFormattedResults(artistsFiltered);

    return res.json({
      error: false,
      data: {
        query: artistName,
        matches: artistsFormatted,
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

module.exports = search;
