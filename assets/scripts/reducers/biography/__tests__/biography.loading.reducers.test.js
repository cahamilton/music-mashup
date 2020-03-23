/** @format */

import loading from '../biography.loading.reducers';

import {
  BIOGRAPHY_PENDING,
  BIOGRAPHY_UPDATE,
} from '../../../actions/biography/biography.actions';

describe('biography.reducers', () => {
  describe('loading', () => {
    it('should return default value', () => {
      const action = { type: 'RANDOM_ACTION' };
      const actual = loading(undefined, action);
      const expected = false;
      expect(actual).toEqual(expected);
    });

    it('should return negated default value', () => {
      const action = { type: BIOGRAPHY_PENDING };
      const actual = loading(undefined, action);
      const expected = true;
      expect(actual).toEqual(expected);
    });

    it('should return negated value', () => {
      const action = { type: BIOGRAPHY_UPDATE };
      const actual = loading(true, action);
      const expected = false;
      expect(actual).toEqual(expected);
    });
  });
});
