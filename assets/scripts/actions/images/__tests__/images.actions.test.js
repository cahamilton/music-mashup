/** @format */

import { get } from 'axios';

import {
  IMAGES_PENDING,
  IMAGES_UPDATE,
  imagesPending,
  imagesSearch,
  imagesUpdate,
} from '../images.actions';
import logger from '../../../utilities/logger';

jest.mock('axios');

describe('images.actions', () => {
  describe('imagesPending', () => {
    it('should return correct action', () => {
      const action = imagesPending();
      expect(action).toEqual({ type: IMAGES_PENDING });
    });
  });

  describe('imagesUpdate', () => {
    it('should return correct action with payload', () => {
      const payload = { source: 'https://source-url.com', images: [] };
      const action = imagesUpdate(payload);
      expect(action).toEqual({ type: IMAGES_UPDATE, payload });
    });

    it('should return correct action with default parameters', () => {
      const payload = {};
      const action = imagesUpdate();
      expect(action).toEqual({ type: IMAGES_UPDATE, payload });
    });
  });

  describe('imagesSearch', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(() => {
      getState.mockReturnValue({
        info: { mbid: '9c9f1380-2516-4fc9-a3e6-f9f61941d090' },
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call imagesUpdate and return (if no musicBrainzId)', async () => {
      getState.mockReturnValue({
        info: { mbid: null },
      });

      expect(dispatch).not.toHaveBeenCalled();
      const actual = await imagesSearch()(dispatch, getState);
      expect(dispatch).toHaveBeenCalledWith(imagesUpdate());
      expect(actual).toEqual(false);
    });

    it('should call imagesPending once', async () => {
      const response = { error: false, data: { source: '', items: [] } };
      get.mockResolvedValue({ data: response });

      expect(dispatch).not.toHaveBeenCalled();
      await imagesSearch()(dispatch, getState);
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, imagesPending());
    });

    it('should call imagesUpdate (with response data)', async () => {
      const response = { error: false, data: { source: '', items: [] } };
      get.mockResolvedValue({ data: response });

      expect(dispatch).not.toHaveBeenCalled();
      await imagesSearch()(dispatch, getState);
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(2, imagesUpdate(response.data));
    });

    it('should call logger if there is an error', async () => {
      const spy = jest.spyOn(logger, 'error');
      const error = { error: 'An error occurred' };
      get.mockRejectedValue(error);

      expect(spy).not.toHaveBeenCalled();
      await imagesSearch()(dispatch, getState);
      expect(spy).toHaveBeenCalledWith(error);
    });

    it('should call imagesPending twice if there is an error (before and after)', async () => {
      const error = { error: 'An error occurred' };
      get.mockRejectedValue(error);

      expect(dispatch).not.toHaveBeenCalled();
      await imagesSearch()(dispatch, getState);
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, imagesPending());
      expect(dispatch).toHaveBeenNthCalledWith(2, imagesPending());
    });
  });
});
