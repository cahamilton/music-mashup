/** @format */

/**
 * Retrieve YouTube username from URL string
 * @param url
 * @return {string|null}
 */
const getYouTubeUserName = (url) => {
  const split = url.split('/');
  const index = split.findIndex((item) => item === 'user');

  if (index === -1) {
    return null;
  }

  const username = split[index + 1];

  return username;
};

module.exports = getYouTubeUserName;
