/** @format */

import axios from 'axios';
import {
  BIOGRAPHY_PENDING,
  BIOGRAPHY_UPDATE,
  biographyPending,
  biographySearch,
  biographyUpdate,
} from '../biography.actions';
import type {
  ActionBiographyPending,
  ActionBiographyUpdate,
} from '../biography.actions';
import type { StateBiographyContent } from '../../../reducers/biography/biography.content.reducers';
import logger from '../../../utilities/logger';

jest.mock('axios');

const { post } = axios as jest.Mocked<typeof axios>;

describe('biography.actions', () => {
  describe('biographyPending', () => {
    it('should should return the correct action', () => {
      const actual = biographyPending();
      const expected: ActionBiographyPending = { type: BIOGRAPHY_PENDING };
      expect(actual).toEqual(expected);
    });
  });

  describe('biographyUpdate', () => {
    it('should should return the correct action (with default value)', () => {
      const actual = biographyUpdate();
      const expected: ActionBiographyUpdate = {
        type: BIOGRAPHY_UPDATE,
        payload: {},
      };
      expect(actual).toEqual(expected);
    });

    it('should should return the correct action (with default value)', () => {
      const payload: StateBiographyContent = {
        extract: 'Fusce sit amet imperdiet leo. Aenean ut mattis ante.',
        image: 'image.jpg',
        source: 'https://en.wikipedia.org/wiki/Awesome_(band)',
      };
      const actual = biographyUpdate(payload);
      const expected: ActionBiographyUpdate = {
        type: BIOGRAPHY_UPDATE,
        payload,
      };
      expect(actual).toEqual(expected);
    });
  });

  describe('biographySearch', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should call biographyPending', async () => {
      const action = biographyPending();

      expect(dispatch).not.toHaveBeenCalled();
      await biographySearch('mbid', undefined)(dispatch, getState, undefined);
      expect(dispatch).toHaveBeenCalledWith(action);
    });

    it('should call biographyUpdate and return (if no source)', async () => {
      const action = biographyUpdate();

      expect(dispatch).not.toHaveBeenCalled();
      const actual = await biographySearch('mbid', '')(
        dispatch,
        getState,
        undefined,
      );
      expect(actual).toEqual(false);
      expect(dispatch).toHaveBeenCalledWith(action);
    });

    it('should call biographyUpdate (with response data)', async () => {
      const response: {
        error: boolean;
        data: StateBiographyContent;
      } = {
        error: false,
        data: {
          extract: 'Fusce sit amet imperdiet leo. Aenean ut mattis ante.',
          image: 'image.jpg',
          source: 'https://en.wikipedia.org/wiki/Awesome_(band)',
        },
      };
      const action = biographyUpdate(response.data);
      post.mockResolvedValue({ data: response });

      expect(dispatch).not.toHaveBeenCalled();
      await biographySearch('mbid', 'sourceURL')(dispatch, getState, undefined);
      expect(dispatch).toHaveBeenCalledWith(action);
    });

    it('should call logger if there is an error', async () => {
      const spy = jest.spyOn(logger, 'error');
      const error = { error: 'An error occurred' };
      post.mockRejectedValue(error);

      expect(spy).not.toHaveBeenCalled();
      await biographySearch('mbid', 'sourceURL')(dispatch, getState, undefined);
      expect(spy).toHaveBeenCalledWith(error);
    });
  });
});
