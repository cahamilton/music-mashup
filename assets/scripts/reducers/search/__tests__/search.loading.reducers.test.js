/** @format */

import loading from '../search.loading.reducers';

import { SEARCH_PENDING } from '../../../actions/search/search.actions';
import { INFO_UPDATE } from '../../../actions/info/info.actions';

describe('search.reducers', () => {
  describe('loading', () => {
    it('should return default value', () => {
      const action = { type: 'RANDOM' };
      const actual = loading(undefined, action);
      expect(actual).toEqual(false);
    });

    it('should return negated default value', () => {
      const action = { type: SEARCH_PENDING };
      const actual = loading(undefined, action);
      expect(actual).toEqual(true);
    });

    it('should return false', () => {
      const action = { type: INFO_UPDATE };
      const actual = loading(true, action);
      expect(actual).toEqual(false);
    });
  });
});
