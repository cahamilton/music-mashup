/** @format */

import loading from '../videos.loading.reducers';
import { VIDEOS_PENDING } from '../../../actions/videos/videos.actions';

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
  });
});
