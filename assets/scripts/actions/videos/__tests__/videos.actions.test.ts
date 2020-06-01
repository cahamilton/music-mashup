/** @format */

import axios from 'axios';
import {
  VIDEOS_PENDING,
  VIDEOS_UPDATE,
  videosPending,
  videosSearch,
  videosUpdate,
} from '../videos.actions';
import type { StateInfo } from '../../../reducers/info/info.reducers';
import type { StateVideosResults } from '../../../reducers/videos/videos.results.reducers';
import logger from '../../../utilities/logger';

jest.mock('axios');

const { post } = axios as jest.Mocked<typeof axios>;

describe('videos.actions', () => {
  describe('videosPending', () => {
    it('should return correct action', () => {
      const action = videosPending();
      expect(action).toEqual({ type: VIDEOS_PENDING });
    });
  });

  describe('videosUpdate', () => {
    it('should return correct action with payload', () => {
      const payload: StateVideosResults = {
        items: [
          { id: '1', title: 'title 1', thumbnail: { '1x': 'image-1.jpg' } },
          { id: '2', title: 'title 2', thumbnail: { '1x': 'image-2.jpg' } },
        ],
      };
      const action = videosUpdate(payload);
      expect(action).toEqual({ type: VIDEOS_UPDATE, payload });
    });

    it('should return correct action with default parameters', () => {
      const action = videosUpdate();
      expect(action).toEqual({ type: VIDEOS_UPDATE });
    });
  });

  describe('videosSearch', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(() => {
      const value: {
        info: StateInfo;
      } = {
        info: {
          name: 'Muse',
          mbid: '9c9f1380-2516-4fc9-a3e6-f9f61941d090',
          relationYoutube: 'https://www.youtube.com/user/muse',
        },
      };

      getState.mockReturnValue(value);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call videosUpdate and return (if no source)', async () => {
      const value: {
        info: StateInfo;
      } = {
        info: {
          name: 'Muse',
          mbid: '9c9f1380-2516-4fc9-a3e6-f9f61941d090',
        },
      };

      getState.mockReturnValue(value);

      expect(dispatch).not.toHaveBeenCalled();
      const actual = await videosSearch()(dispatch, getState, undefined);
      expect(dispatch).toHaveBeenCalledWith(videosUpdate());
      expect(actual).toEqual(false);
    });

    it('should call videosUpdate and return (if no musicBrainzId)', async () => {
      const value: {
        info: StateInfo;
      } = {
        info: {
          name: 'Muse',
          mbid: '',
        },
      };

      getState.mockReturnValue(value);

      expect(dispatch).not.toHaveBeenCalled();
      const actual = await videosSearch()(dispatch, getState, undefined);
      expect(dispatch).toHaveBeenCalledWith(videosUpdate());
      expect(actual).toEqual(false);
    });

    it('should call videosPending once', async () => {
      const response: {
        error: boolean;
        data: StateVideosResults;
      } = {
        error: false,
        data: {
          items: [],
        },
      };
      post.mockResolvedValue({ data: response });

      expect(dispatch).not.toHaveBeenCalled();
      await videosSearch()(dispatch, getState, undefined);
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, videosPending());
    });

    it('should call videosUpdate (with response data)', async () => {
      const response: {
        error: boolean;
        data: StateVideosResults;
      } = {
        error: false,
        data: {
          items: [],
        },
      };
      post.mockResolvedValue({ data: response });

      expect(dispatch).not.toHaveBeenCalled();
      await videosSearch()(dispatch, getState, undefined);
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(2, videosUpdate(response.data));
    });

    it('should call logger if there is an error', async () => {
      const spy = jest.spyOn(logger, 'error');
      const error = { error: 'An error occurred' };
      post.mockRejectedValue(error);

      expect(spy).not.toHaveBeenCalled();
      await videosSearch()(dispatch, getState, undefined);
      expect(spy).toHaveBeenCalledWith(error);
    });

    it('should call videosPending twice if there is an error (before and after)', async () => {
      const error = { error: 'An error occurred' };
      post.mockRejectedValue(error);

      expect(dispatch).not.toHaveBeenCalled();
      await videosSearch()(dispatch, getState, undefined);
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, videosPending());
      expect(dispatch).toHaveBeenNthCalledWith(2, videosPending());
    });
  });
});
