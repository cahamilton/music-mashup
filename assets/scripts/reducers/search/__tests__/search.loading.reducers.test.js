/** @format */

import loading from '../search.loading.reducers';

import {
  SEARCH_PENDING,
  SEARCH_QUERY_UPDATE,
} from '../../../actions/search/search.actions';

describe('search.reducers', () => {
  describe('loading', () => {
    it('should return default value', () => {
      const action = { type: SEARCH_QUERY_UPDATE };
      const actual = loading(undefined, action);
      const expected = false;
      expect(actual).toEqual(expected);
    });

    it('should return negated default value', () => {
      const action = { type: SEARCH_PENDING };
      const actual = loading(undefined, action);
      const expected = true;
      expect(actual).toEqual(expected);
    });
  });
});
