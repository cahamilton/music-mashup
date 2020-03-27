/** @format */

const axios = require('axios');
const cloneDeep = require('clone-deep');

const getYouTubePlaylistItems = require('../getYouTubePlaylistItems');
const logger = require('../../../../logger');
const mock = require('../__mocks__/getYouTubePlaylistItems');

jest.mock('axios');

describe('getYouTubePlaylistItems', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return false if no items', async () => {
    const mockItems = cloneDeep(mock);
    mockItems.items = [];
    axios.get.mockResolvedValue({ data: mockItems });

    const response = await getYouTubePlaylistItems('mock-playlist-id');
    expect(response).toEqual(false);
  });

  it('should return successful response', async () => {
    axios.get.mockResolvedValue({ data: mock });

    const response = await getYouTubePlaylistItems('mock-playlist-id');
    expect(response.playlistId).toEqual('mock-playlist-id');
    expect(response.nextPage).toEqual(mock.nextPageToken);
    expect(response.items).toHaveLength(mock.items.length);
  });

  it('should call logger if error occurs', async () => {
    axios.get.mockRejectedValue({ error: 'An error occurred' });

    const spy = jest.spyOn(logger, 'error');
    expect(spy).toHaveBeenCalledTimes(0);
    await getYouTubePlaylistItems('mock-playlist-id');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should return false if error occurs', async () => {
    axios.get.mockRejectedValue({ error: 'An error occurred' });

    const response = await getYouTubePlaylistItems('mock-playlist-id');
    expect(response).toBe(false);
  });
});
