/** @format */

import loading, { initialState } from '../images.loading.reducers';
import {
  IMAGES_PENDING,
  IMAGES_UPDATE,
} from '../../../actions/images/images.actions';

describe('images.reducers', () => {
  describe('loading', () => {
    it('should return default value', () => {
      const action = { type: 'RANDOM' };
      const actual = loading(undefined, action);
      expect(actual).toEqual(initialState);
    });

    it('should return negated default value', () => {
      const action = { type: IMAGES_PENDING };
      const actual = loading(undefined, action);
      expect(actual).toEqual(!initialState);
    });

    it('should return false', () => {
      const action = { type: IMAGES_UPDATE };
      expect(loading(true, action)).toEqual(false);
      expect(loading(false, action)).toEqual(false);
    });
  });
});
