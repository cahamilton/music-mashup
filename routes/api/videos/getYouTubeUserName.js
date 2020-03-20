/** @format */

const { MusicBrainzApi } = require('musicbrainz-api');

const logger = require('../../../logger');
const musicBrainzConfig = require('../config/musicBrainz');

/**
 * Get YouTube username from MusicBrainz ID
 * @param id
 * @return {Promise<string|boolean>}
 */
const getYouTubeUserName = async (id) => {
  const musicBrainzApi = new MusicBrainzApi(musicBrainzConfig);

  try {
    const artist = await musicBrainzApi.getArtist(id, ['url-rels']);

    const youtube = artist.relations.find(
      (relation) => relation.type === 'youtube',
    );

    if (!youtube) {
      return false;
    }

    const url = youtube.url.resource;
    const username = url.split('/user/')[1];

    return username;
  } catch (error) {
    logger.error(error.message);

    return false;
  }
};

module.exports = getYouTubeUserName;
