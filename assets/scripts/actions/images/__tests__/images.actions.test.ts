/** @format */

import axios from 'axios';

import {
  IMAGES_PENDING,
  IMAGES_UPDATE,
  imagesPending,
  imagesSearch,
  imagesUpdate,
} from '../images.actions';
import type {
  ActionImagesPending,
  ActionImagesUpdate,
} from '../images.actions';
import type { StateInfo } from '../../../reducers/info/info.reducers';
import type { StateImagesResults } from '../../../reducers/images/images.results.reducers';
import logger from '../../../utilities/logger';

jest.mock('axios');

const { get } = axios as jest.Mocked<typeof axios>;

describe('images.actions', () => {
  describe('imagesPending', () => {
    it('should return correct action', () => {
      const expected: ActionImagesPending = { type: IMAGES_PENDING };
      const action = imagesPending();
      expect(action).toEqual(expected);
    });
  });

  describe('imagesUpdate', () => {
    it('should return correct action with payload', () => {
      const payload = { source: 'https://source-url.com', images: [] };
      const expected: ActionImagesUpdate = { type: IMAGES_UPDATE, payload };
      const action = imagesUpdate(payload);
      expect(action).toEqual(expected);
    });

    it('should return correct action with default parameters', () => {
      const payload = {};
      const expected: ActionImagesUpdate = { type: IMAGES_UPDATE, payload };
      const action = imagesUpdate();
      expect(action).toEqual(expected);
    });
  });

  describe('imagesSearch', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(() => {
      const value: {
        info: StateInfo;
      } = {
        info: { name: 'Muse', mbid: '9c9f1380-2516-4fc9-a3e6-f9f61941d090' },
      };
      getState.mockReturnValue(value);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call imagesUpdate and return (if no musicBrainzId)', async () => {
      const value: {
        info: StateInfo;
      } = {
        info: { name: 'Muse', mbid: '' },
      };
      getState.mockReturnValue(value);

      expect(dispatch).not.toHaveBeenCalled();
      const actual = await imagesSearch()(dispatch, getState, undefined);
      expect(dispatch).toHaveBeenCalledWith(imagesUpdate());
      expect(actual).toEqual(false);
    });

    it('should call imagesPending once', async () => {
      const response: {
        error: boolean;
        data: StateImagesResults;
      } = {
        error: false,
        data: { source: '', images: [] },
      };
      get.mockResolvedValue({ data: response });

      expect(dispatch).not.toHaveBeenCalled();
      await imagesSearch()(dispatch, getState, undefined);
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, imagesPending());
    });

    it('should call imagesUpdate (with response data)', async () => {
      const response: {
        error: boolean;
        data: StateImagesResults;
      } = {
        error: false,
        data: { source: '', images: [] },
      };
      get.mockResolvedValue({ data: response });

      expect(dispatch).not.toHaveBeenCalled();
      await imagesSearch()(dispatch, getState, undefined);
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(2, imagesUpdate(response.data));
    });

    it('should call logger if there is an error', async () => {
      const spy = jest.spyOn(logger, 'error');
      const error = { error: 'An error occurred' };
      get.mockRejectedValue(error);

      expect(spy).not.toHaveBeenCalled();
      await imagesSearch()(dispatch, getState, undefined);
      expect(spy).toHaveBeenCalledWith(error);
    });

    it('should call imagesPending twice if there is an error (before and after)', async () => {
      const error = { error: 'An error occurred' };
      get.mockRejectedValue(error);

      expect(dispatch).not.toHaveBeenCalled();
      await imagesSearch()(dispatch, getState, undefined);
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, imagesPending());
      expect(dispatch).toHaveBeenNthCalledWith(2, imagesPending());
    });
  });
});
