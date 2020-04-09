/** @format */
const status = require('http-status-codes');
const { get } = require('axios');

const getFormattedResponse = require('./images/getFormattedResponse');
const isProduction = require('../../helpers/isProduction');
const logger = require('../../logger');

const images = async (req, res) => {
  const { musicBrainzID } = req.params;
  const { debug } = req.query;

  if (!musicBrainzID) {
    return res.status(status.BAD_REQUEST).json({
      error: true,
      message: 'Missing musicBrainzID parameter',
    });
  }

  try {
    const response = await get(
      `https://webservice.fanart.tv/v3/music/${musicBrainzID}`,
      {
        params: {
          api_key: process.env.FANART_KEY,
        },
      },
    );

    if (!isProduction && debug) {
      return res.status(status.OK).json(response.data);
    }

    return res.status(status.OK).json({
      error: false,
      data: getFormattedResponse(response.data),
    });
  } catch (error) {
    logger.error(error);

    return res.status(status.OK).json({
      error: true,
      message: error.message,
    });
  }
};

module.exports = images;
