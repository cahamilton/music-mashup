/** @format */

const videos = require('../videos');
const getYouTubeUserName = require('../videos/getYouTubeUserName');
const getYouTubePlaylistId = require('../videos/getYouTubePlaylistId');
const getYouTubePlaylistItems = require('../videos/getYouTubePlaylistItems');

jest.mock('../videos/getYouTubeUserName', () => jest.fn());
jest.mock('../videos/getYouTubePlaylistId', () => jest.fn());
jest.mock('../videos/getYouTubePlaylistItems', () => jest.fn());

describe('videos', () => {
  const mockReq = {
    params: {},
    body: {},
  };

  const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  const source = 'http://www.youtube.com/user/muse';
  const musicBrainzID = 'fd857293-5ab8-40de-b29e-55a69d4e4d0f';

  it('should return an error if no musicBrainzID', async () => {
    const req = { ...mockReq };
    const res = mockRes();

    await videos(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Missing musicBrainzID parameter' }),
    );
  });

  it('should return an error if no source', async () => {
    const req = { ...mockReq, params: { musicBrainzID } };
    const res = mockRes();

    await videos(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Missing source body parameter' }),
    );
  });

  it('should call getYouTubeUserName with source', async () => {
    const req = { ...mockReq, params: { musicBrainzID }, body: { source } };
    const res = mockRes();

    expect(getYouTubeUserName).not.toHaveBeenCalled();
    await videos(req, res);
    expect(getYouTubeUserName).toHaveBeenCalledWith(req.body.source);
  });

  it('should return an error if no username', async () => {
    const req = { ...mockReq, params: { musicBrainzID }, body: { source } };
    const res = mockRes();
    getYouTubeUserName.mockImplementation(() => null);

    await videos(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Artist has no active YouTube channel',
      }),
    );
  });

  it('should call getYouTubePlaylistId with username', async () => {
    const req = { ...mockReq, params: { musicBrainzID }, body: { source } };
    const res = mockRes();
    getYouTubeUserName.mockImplementation(() => 'muse');

    expect(getYouTubePlaylistId).not.toHaveBeenCalled();
    await videos(req, res);
    expect(getYouTubePlaylistId).toHaveBeenCalledWith('muse');
  });

  it('should return an error if no playlistId', async () => {
    const req = { ...mockReq, params: { musicBrainzID }, body: { source } };
    const res = mockRes();
    getYouTubeUserName.mockImplementation(() => 'muse');
    getYouTubePlaylistId.mockImplementation(() => null);

    await videos(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Playlist could not be found',
      }),
    );
  });

  it('should call getYouTubePlaylistItems with playlistId', async () => {
    const req = { ...mockReq, params: { musicBrainzID }, body: { source } };
    const res = mockRes();
    getYouTubeUserName.mockImplementation(() => 'muse');
    getYouTubePlaylistId.mockImplementation(() => 'UUi2KNss4Yx73NG0JARSFe0A');

    expect(getYouTubePlaylistItems).not.toHaveBeenCalled();
    await videos(req, res);
    expect(getYouTubePlaylistItems).toHaveBeenCalledWith(
      'UUi2KNss4Yx73NG0JARSFe0A',
    );
  });

  it('should return an error if no playlistItems', async () => {
    const req = { ...mockReq, params: { musicBrainzID }, body: { source } };
    const res = mockRes();
    getYouTubeUserName.mockImplementation(() => 'muse');
    getYouTubePlaylistId.mockImplementation(() => 'UUi2KNss4Yx73NG0JARSFe0A');
    getYouTubePlaylistItems.mockImplementation(() => false);

    await videos(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Playlist videos could not be found',
      }),
    );
  });

  it('should return playlistItems on success', async () => {
    const req = { ...mockReq, params: { musicBrainzID }, body: { source } };
    const res = mockRes();
    getYouTubeUserName.mockImplementation(() => 'muse');
    getYouTubePlaylistId.mockImplementation(() => 'UUi2KNss4Yx73NG0JARSFe0A');
    getYouTubePlaylistItems.mockImplementation(() => ({
      playlistId: 'UUi2KNss4Yx73NG0JARSFe0A',
      nextPage: 'v23GoaW',
      items: [{ title: 'Video 1' }],
    }));

    await videos(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {
          playlistId: 'UUi2KNss4Yx73NG0JARSFe0A',
          nextPage: 'v23GoaW',
          items: [{ title: 'Video 1' }],
        },
      }),
    );
  });
});
