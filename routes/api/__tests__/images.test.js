/** @format */

const axios = require('axios');

const getFormattedResponse = require('../images/getFormattedResponse');
const images = require('../images');
const logger = require('../../../utilities/logger');

jest.mock('axios');
jest.mock('../images/getFormattedResponse', () => jest.fn());

describe('images', () => {
  const mockReq = {
    body: {},
    params: {},
    query: {},
  };

  const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  const debug = 1;
  const musicBrainzID = 'fd857293-5ab8-40de-b29e-55a69d4e4d0f';

  it('should return an error response if no musicBrainzID', async () => {
    const req = { ...mockReq };
    const res = mockRes();

    await images(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Missing musicBrainzID parameter' }),
    );
  });

  it('should return original response', async () => {
    const NODE_ENV_PREVIOUS = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    const req = {
      ...mockReq,
      params: { musicBrainzID },
      query: { debug },
    };
    const res = mockRes();

    const response = { data: { name: 'Muse', images: [] } };
    axios.get.mockResolvedValue(response);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    await images(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining(response.data),
    );

    process.env.NODE_ENV = NODE_ENV_PREVIOUS;
  });

  it('should return formatted data response', async () => {
    const req = { ...mockReq, params: { musicBrainzID } };
    const res = mockRes();

    const response = { data: { name: 'Muse', images: [] } };
    axios.get.mockResolvedValue(response);

    expect(getFormattedResponse).not.toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    await images(req, res);
    expect(getFormattedResponse).toHaveBeenCalledWith(response.data);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: false }),
    );
  });

  it('should call logger if error occurs', async () => {
    const req = { ...mockReq, params: { musicBrainzID } };
    const res = mockRes();

    const response = { error: true, message: 'An error occurred' };
    axios.get.mockRejectedValue(response);

    const spy = jest.spyOn(logger, 'error');
    expect(spy).not.toHaveBeenCalled();
    await images(req, res);
    expect(spy).toHaveBeenCalledWith(response);
  });

  it('should return JSON response, if an an error occurs', async () => {
    const req = { ...mockReq, params: { musicBrainzID } };
    const res = mockRes();

    const response = { error: true, message: 'An error occurred' };
    axios.get.mockRejectedValue(response);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    await images(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: true, message: response.message }),
    );
  });
});
