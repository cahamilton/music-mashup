/** @format */

const axios = require('axios');
const getWikipediaTitle = require('../getWikipediaTitle');
const logger = require('../../../../logger');
const response = require('../__mocks__/responses/responseWikipediaTitle');

jest.mock('axios');

describe('getWikipediaTitle', () => {
  it('should return null if wikidataId is falsy', async () => {
    const actual = await getWikipediaTitle('');
    expect(actual).toBeNull();
  });

  it('should return wikipedia page title string', async () => {
    const value = { data: response };
    axios.get.mockResolvedValue(value);
    const actual = await getWikipediaTitle('Q22151');
    const expected = 'Muse (band)';
    expect(actual).toEqual(expected);
  });

  it('should call logger if an error occurs', async () => {
    const value = { error: 'An error occurred' };
    const spy = jest.spyOn(logger, 'error');
    axios.get.mockRejectedValue(value);
    expect(spy).not.toHaveBeenCalled();
    await getWikipediaTitle('Q22151');
    expect(spy).toHaveBeenCalledWith(expect.objectContaining(value));
  });

  it('should return null if an error occurs', async () => {
    const value = { error: 'An error occurred' };
    axios.get.mockRejectedValue(value);
    const actual = await getWikipediaTitle('Q22151');
    expect(actual).toBeNull();
  });
});
