/** @format */

import { post } from 'axios';

import {
  VIDEOS_PENDING,
  VIDEOS_UPDATE,
  videosPending,
  videosSearch,
  videosUpdate,
} from '../videos.actions';

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

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should call videosUpdate and return (if no source)', async () => {
      const action = videosUpdate();

      expect(dispatch).not.toHaveBeenCalled();
      const actual = await videosSearch('mbid', '')(dispatch);
      expect(actual).toEqual(false);
      expect(dispatch).toHaveBeenCalledWith(action);
    });

    it('should call videosUpdate and return (if no musicBrainzId)', async () => {
      const action = videosUpdate();

      expect(dispatch).not.toHaveBeenCalled();
      const actual = await videosSearch('', 'sourceURL')(dispatch);
      expect(actual).toEqual(false);
      expect(dispatch).toHaveBeenCalledWith(action);
    });

    it('should call videosPending (as first and last action)', async () => {
      const response = { error: false, data: { videos: [] } };
      const action = videosPending();
      post.mockResolvedValue({ data: response });

      expect(dispatch).not.toHaveBeenCalled();
      await videosSearch('mbid', 'sourceURL')(dispatch);
      expect(dispatch).toHaveBeenNthCalledWith(1, action);
      expect(dispatch).toHaveBeenLastCalledWith(action);
    });

    it('should call videosUpdate (with response data)', async () => {
      const response = { error: false, data: { videos: [] } };
      const action = videosUpdate(response.data);
      post.mockResolvedValue({ data: response });

      expect(dispatch).not.toHaveBeenCalled();
      await videosSearch('mbid', 'sourceURL')(dispatch);
      expect(dispatch).toHaveBeenCalledWith(action);
    });

    it('should call console log if theres an error', async () => {
      const spy = jest.spyOn(global.console, 'log');
      const error = { error: 'An error occurred' };
      post.mockRejectedValue(error);

      expect(spy).not.toHaveBeenCalled();
      await videosSearch('mbid', 'sourceURL')(dispatch);
      expect(spy).toHaveBeenCalledWith(error);
    });
  });
});
