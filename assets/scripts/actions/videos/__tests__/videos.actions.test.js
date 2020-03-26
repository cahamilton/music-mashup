/** @format */

import {
  VIDEOS_PENDING,
  VIDEOS_UPDATE,
  videosPending,
  videosUpdate,
} from '../videos.actions';

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
    it.todo('should call videosPending once');

    it.todo('should call videosUpdate (with no params), if no source');

    it.todo('should call videosUpdate (with response data), if successful');

    it.todo('should call logger if an error occurs');
  });
});
