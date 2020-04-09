/** @format */

/**
 * Reformat response data
 * @param {Object} data
 * @return {Object}
 */
const getFormattedResponse = (data) => {
  const {
    artistbackground: images,
    mbid_id: musicBrainzID,
    name: title,
  } = data;

  return {
    source: `https://fanart.tv/artist/${musicBrainzID}`,
    items: images.map(({ id, url }) => ({
      id,
      title,
      url,
      thumbnail: {
        '1x': url.replace('/fanart/', '/preview/'),
      },
    })),
  };
};

module.exports = getFormattedResponse;
