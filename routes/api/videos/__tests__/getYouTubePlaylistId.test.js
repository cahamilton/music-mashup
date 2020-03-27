/** @format */

const axios = require('axios');
const cloneDeep = require('clone-deep');

const getYouTubePlaylistId = require('../getYouTubePlaylistId');
const logger = require('../../../../logger');
const mock = require('../__mocks__/getYouTubePlaylistId');

jest.mock('axios');

describe('getYouTubePlaylistId', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return false if no items', async () => {
    const mockItems = cloneDeep(mock);
    mockItems.items = [];
    axios.get.mockResolvedValue({ data: mockItems });

    const response = await getYouTubePlaylistId('foofighters');
    expect(response).toEqual(false);
  });

  it('should return the uploads playlist id', async () => {
    axios.get.mockResolvedValue({ data: mock });

    const response = await getYouTubePlaylistId('foofighters');
    expect(response).toBe('UUi2KNss4Yx73NG0JARSFe0A');
  });

  it('should call logger if error occurs', async () => {
    axios.get.mockRejectedValue({ error: 'An error occurred' });

    const spy = jest.spyOn(logger, 'error');
    expect(spy).toHaveBeenCalledTimes(0);
    await getYouTubePlaylistId('foofighters');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should return false if error occurs', async () => {
    axios.get.mockRejectedValue({ error: 'An error occurred' });

    const response = await getYouTubePlaylistId('foofighters');
    expect(response).toBe(false);
  });
});
