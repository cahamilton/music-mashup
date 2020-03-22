/** @format */

/**
 * Get a specific relation type from a MusicBrainz Artist Entity
 * @param {Object} mbArtist - MusicBrainz Artist Entity
 * @param {String} type - Relation Type (eg. wikidata, youtube, last.fm)
 * @return {String|Null}
 */
const getArtistRelation = (mbArtist, type) => {
  const relationMatch = mbArtist.relations.find(
    (relation) => relation.type === type,
  );

  if (!relationMatch) {
    return null;
  }

  return relationMatch.url.resource;
};

module.exports = getArtistRelation;
