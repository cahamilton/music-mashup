/** @format */

import query from '../search.query.reducers';

import { SEARCH_UPDATE } from '../../../actions/search/search.actions';

describe('search.reducers', () => {
  describe('query', () => {
    it('should return default value', () => {
      const action = { type: 'RANDOM' };
      const actual = query(undefined, action);
      expect(actual).toEqual('');
    });

    it('should return new query value', () => {
      const action = {
        type: SEARCH_UPDATE,
        payload: {
          query: 'foo fighters',
          matches: [{ name: 'Artist1' }, { name: 'Artist2' }],
        },
      };
      const actual = query(undefined, action);
      expect(actual).toEqual(action.payload.query);
    });
  });
});
