/** @format */

const toTitleCase = require('../../../utilities/toTitleCase');

/**
 * Return top genre for an Artist
 * @param {Object} mbArtist - MusicBrainz Artist Entity
 * @return {String|null}
 */
const getArtistTopGenre = (mbArtist) => {
  const { genres } = mbArtist;

  if (!genres.length) {
    return null;
  }

  const match = genres.reduce((previous, current) =>
    previous.count > current.count ? previous : current,
  );

  const genreTitleCase = toTitleCase(match.name);

  return genreTitleCase;
};

module.exports = getArtistTopGenre;
