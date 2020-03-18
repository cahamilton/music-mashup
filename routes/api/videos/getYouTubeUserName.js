/** @format */

const { MusicBrainzApi } = require('musicbrainz-api');

const logger = require('../../../logger');
const { author, name, version } = require('../../../package.json');

const musicBrainz = new MusicBrainzApi({
  appName: name,
  appVersion: version,
  appContactInfo: author,
});

/**
 * Get YouTube username from MusicBrainz ID
 * @param id
 * @return {Promise<string|boolean>}
 */
const getYouTubeUserName = async (id) => {
  try {
    const artist = await musicBrainz.getArtist(id, ['url-rels']);

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
