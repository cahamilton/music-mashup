/** @format */

import loading from '../videos.loading.reducers';
import {
  VIDEOS_PENDING,
  VIDEOS_UPDATE,
} from '../../../actions/videos/videos.actions';

describe('videos.reducers', () => {
  describe('loading', () => {
    it('should return default value', () => {
      const action = { type: 'RANDOM' };
      const actual = loading(undefined, action);
      expect(actual).toEqual(false);
    });

    it('should return negated default value', () => {
      const action = { type: VIDEOS_PENDING };
      const actual = loading(undefined, action);
      expect(actual).toEqual(true);
    });

    it('should return false', () => {
      const action = { type: VIDEOS_UPDATE };
      expect(loading(true, action)).toEqual(false);
      expect(loading(false, action)).toEqual(false);
    });
  });
});
