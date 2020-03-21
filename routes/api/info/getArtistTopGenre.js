/** @format */

const toTitleCase = require('../../../utilities/toTitleCase');

/**
 * Return top genre for an Artist
 * @param {Array} genres - Array of genres returned from MusicBrainz API
 * @return {String|null}
 */
const getArtistTopGenre = (genres) => {
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
