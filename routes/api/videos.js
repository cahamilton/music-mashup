/** @format */

const status = require('http-status-codes');

const getYouTubeUserName = require('./videos/getYouTubeUserName');
const getYouTubePlaylistId = require('./videos/getYouTubePlaylistId');
const getYouTubePlaylistItems = require('./videos/getYouTubePlaylistItems');

/**
 * @param req
 * @param res
 * @return {Promise}
 */
const videos = async (req, res) => {
  const { musicBrainzID } = req.params;
  const { source } = req.body;

  if (!musicBrainzID) {
    return res.status(status.BAD_REQUEST).json({
      error: true,
      message: 'Missing musicBrainzID parameter',
    });
  }

  if (!source) {
    return res.status(status.BAD_REQUEST).json({
      error: true,
      message: 'Missing source body parameter',
    });
  }

  const username = getYouTubeUserName(source);

  if (!username) {
    return res.status(status.OK).json({
      error: true,
      message: 'Artist has no active YouTube channel',
    });
  }

  const playlistId = await getYouTubePlaylistId(username);

  if (!playlistId) {
    return res.status(status.OK).json({
      error: true,
      message: 'Playlist could not be found',
    });
  }

  const playlistItems = await getYouTubePlaylistItems(playlistId);

  if (!playlistItems) {
    return res.status(status.OK).json({
      error: true,
      message: 'Playlist videos could not be found',
    });
  }

  return res.status(status.OK).json({
    error: false,
    data: playlistItems,
  });
};

module.exports = videos;
