/** @format */

const axios = require('axios');

const biography = require('../biography');
const getFormattedResults = require('../biography/getFormattedResults');
const getWikidataId = require('../biography/getWikidataId');
const getWikipediaTitle = require('../biography/getWikipediaTitle');
const logger = require('../../../utilities/logger');
const mockWikipedia = require('../biography/__mocks__/responses/responseWikipedia');

jest.mock('axios');
jest.mock('../biography/getWikidataId', () => jest.fn(() => 'Q22151'));
jest.mock('../biography/getWikipediaTitle', () => jest.fn(() => 'Muse_(band)'));

const mockReq = {
  params: {},
  body: {},
  query: {},
};

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('biography', () => {
  const debug = 1;
  const musicBrainzID = 'fd857293-5ab8-40de-b29e-55a69d4e4d0f';
  const source = 'http://www.youtube.com/user/muse';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an error if no musicBrainzID', async () => {
    const req = { ...mockReq };
    const res = mockRes();

    await biography(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Missing musicBrainzID parameter' }),
    );
  });

  it('should return an error if no source', async () => {
    const req = { ...mockReq, params: { musicBrainzID } };
    const res = mockRes();

    await biography(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Missing source body parameter' }),
    );
  });

  it('should call getWikidataId with source', async () => {
    const req = { ...mockReq, params: { musicBrainzID }, body: { source } };
    const res = mockRes();

    expect(getWikidataId).not.toHaveBeenCalled();
    await biography(req, res);
    expect(getWikidataId).toHaveBeenCalledWith(req.body.source);
  });

  it('should call getWikipediaTitle with wikidataId', async () => {
    const req = { ...mockReq, params: { musicBrainzID }, body: { source } };
    const res = mockRes();

    expect(getWikipediaTitle).not.toHaveBeenCalled();
    await biography(req, res);
    expect(getWikipediaTitle).toHaveBeenCalledWith('Q22151');
  });

  it('should return original wikipedia response', async () => {
    const NODE_ENV_PREVIOUS = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    const req = {
      ...mockReq,
      params: { musicBrainzID },
      body: { source },
      query: { debug },
    };
    const res = mockRes();
    const value = { data: mockWikipedia };

    axios.get.mockResolvedValue(value);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    await biography(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining(mockWikipedia),
    );

    process.env.NODE_ENV = NODE_ENV_PREVIOUS;
  });

  it('should return formatted results', async () => {
    const req = { ...mockReq, params: { musicBrainzID }, body: { source } };
    const res = mockRes();
    const value = { data: mockWikipedia };

    axios.get.mockResolvedValue(value);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    await biography(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: getFormattedResults(mockWikipedia),
      }),
    );
  });

  it('should call logger if an error occurs', async () => {
    const req = { ...mockReq, params: { musicBrainzID }, body: { source } };
    const res = mockRes();
    const spy = jest.spyOn(logger, 'error');
    const value = { message: 'An error occurred' };

    axios.get.mockRejectedValue(value);
    expect(spy).not.toHaveBeenCalled();
    await biography(req, res);
    expect(spy).toHaveBeenCalledWith(expect.objectContaining(value));
  });

  it('should respond if an error occurs', async () => {
    const req = { ...mockReq, params: { musicBrainzID }, body: { source } };
    const res = mockRes();
    const value = { message: 'An error occurred' };

    axios.get.mockRejectedValue(value);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    await biography(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: true, message: value.message }),
    );
  });
});
