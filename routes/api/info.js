/** @format */

const status = require('http-status-codes');
const { MusicBrainzApi } = require('musicbrainz-api');

const getArtistRelation = require('./info/getArtistRelation');
const getArtistTopGenre = require('./info/getArtistTopGenre');
const isProduction = require('../../helpers/isProduction');
const logger = require('../../logger');
const musicBrainzConfig = require('./config/musicBrainz');

const info = async (req, res) => {
  const { debug } = req.query;
  const { musicBrainzID } = req.params;

  if (!musicBrainzID) {
    return res.status(status.BAD_REQUEST).json({
      error: true,
      message: 'Missing musicBrainzID parameter',
    });
  }

  try {
    const mbApi = new MusicBrainzApi(musicBrainzConfig);
    const mbArtist = await mbApi.getArtist(musicBrainzID, [
      'genres',
      'url-rels',
    ]);

    if (!isProduction && debug) {
      return res.status(status.OK).json(mbArtist);
    }

    const artistTopGenre = getArtistTopGenre(mbArtist);

    return res.status(status.OK).json({
      error: false,
      data: {
        name: mbArtist.name,
        mbid: mbArtist.id,
        genre: artistTopGenre,
        relations: {
          wikidata: getArtistRelation(mbArtist, 'wikidata'),
        },
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

module.exports = info;
