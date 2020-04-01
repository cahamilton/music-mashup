/** @format */

import { post } from 'axios';

import {
  VIDEOS_PENDING,
  VIDEOS_UPDATE,
  videosPending,
  videosSearch,
  videosUpdate,
} from '../videos.actions';
import logger from '../../../utilities/logger';

jest.mock('axios');

describe('videos.actions', () => {
  describe('videosPending', () => {
    it('should return correct action', () => {
      const action = videosPending();
      expect(action).toEqual({ type: VIDEOS_PENDING });
    });
  });

  describe('videosUpdate', () => {
    it('should return correct action with payload', () => {
      const payload = { content: 'Super Interesting Stuff' };
      const action = videosUpdate(payload);
      expect(action).toEqual({ type: VIDEOS_UPDATE, payload });
    });

    it('should return correct action with default parameters', () => {
      const action = videosUpdate();
      expect(action).toEqual({ type: VIDEOS_UPDATE, payload: {} });
    });
  });

  describe('videosSearch', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(() => {
      getState.mockReturnValue({
        info: {
          mbid: '9c9f1380-2516-4fc9-a3e6-f9f61941d090',
          relationYoutube: 'https://www.youtube.com/user/muse',
        },
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call videosUpdate and return (if no source)', async () => {
      getState.mockReturnValue({
        info: {
          mbid: null,
          relationYoutube: null,
        },
      });

      expect(dispatch).not.toHaveBeenCalled();
      const actual = await videosSearch()(dispatch, getState);
      expect(dispatch).toHaveBeenCalledWith(videosUpdate());
      expect(actual).toEqual(false);
    });

    it('should call videosUpdate and return (if no musicBrainzId)', async () => {
      getState.mockReturnValue({
        info: {
          mbid: null,
          relationYoutube: null,
        },
      });

      expect(dispatch).not.toHaveBeenCalled();
      const actual = await videosSearch()(dispatch, getState);
      expect(dispatch).toHaveBeenCalledWith(videosUpdate());
      expect(actual).toEqual(false);
    });

    it('should call videosPending once', async () => {
      const response = { error: false, data: { videos: [] } };
      post.mockResolvedValue({ data: response });

      expect(dispatch).not.toHaveBeenCalled();
      await videosSearch()(dispatch, getState);
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, videosPending());
    });

    it('should call videosUpdate (with response data)', async () => {
      const response = { error: false, data: { videos: [] } };
      post.mockResolvedValue({ data: response });

      expect(dispatch).not.toHaveBeenCalled();
      await videosSearch()(dispatch, getState);
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(2, videosUpdate(response.data));
    });

    it('should call logger if there is an error', async () => {
      const spy = jest.spyOn(logger, 'error');
      const error = { error: 'An error occurred' };
      post.mockRejectedValue(error);

      expect(spy).not.toHaveBeenCalled();
      await videosSearch()(dispatch, getState);
      expect(spy).toHaveBeenCalledWith(error);
    });

    it('should call videosPending twice if there is an error (before and after)', async () => {
      const error = { error: 'An error occurred' };
      post.mockRejectedValue(error);

      expect(dispatch).not.toHaveBeenCalled();
      await videosSearch()(dispatch, getState);
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, videosPending());
      expect(dispatch).toHaveBeenNthCalledWith(2, videosPending());
    });
  });
});
