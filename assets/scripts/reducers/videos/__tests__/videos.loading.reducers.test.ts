/** @format */

import loading from '../videos.loading.reducers';
import { DEFAULT } from '../../../actions/actions';
import {
  VIDEOS_PENDING,
  VIDEOS_UPDATE,
} from '../../../actions/videos/videos.actions';
import type { ActionDefault } from '../../../actions/actions';
import type {
  ActionVideosPending,
  ActionVideosUpdate,
} from '../../../actions/videos/videos.actions';

describe('videos.reducers', () => {
  describe('loading', () => {
    it('should return default value', () => {
      const action: ActionDefault = { type: DEFAULT };
      const actual = loading(undefined, action);
      expect(actual).toEqual(false);
    });

    it('should return negated default value', () => {
      const action: ActionVideosPending = { type: VIDEOS_PENDING };
      const actual = loading(undefined, action);
      expect(actual).toEqual(true);
    });

    it('should return false', () => {
      const action: ActionVideosUpdate = { type: VIDEOS_UPDATE };
      expect(loading(true, action)).toEqual(false);
      expect(loading(false, action)).toEqual(false);
    });
  });
});
