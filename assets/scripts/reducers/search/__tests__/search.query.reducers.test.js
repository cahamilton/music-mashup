/** @format */

import query from '../search.query.reducers';

import {
  SEARCH_QUERY_UPDATE,
  SEARCH_RESULTS_MATCHES_UPDATE,
} from '../../../actions/search/search.actions';

describe('search.reducers', () => {
  describe('query', () => {
    it('should return default value', () => {
      const action = { type: SEARCH_RESULTS_MATCHES_UPDATE };
      const actual = query(undefined, action);
      const expected = '';
      expect(actual).toEqual(expected);
    });

    it('should return new query value', () => {
      const action = { type: SEARCH_QUERY_UPDATE, payload: 'foo fighters' };
      const actual = query(undefined, action);
      const expected = action.payload;
      expect(actual).toEqual(expected);
    });
  });
});
