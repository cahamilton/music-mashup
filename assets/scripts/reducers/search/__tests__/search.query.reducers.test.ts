/** @format */

import query from '../search.query.reducers';

import { DEFAULT } from '../../../actions/actions';
import { SEARCH_UPDATE } from '../../../actions/search/search.actions';
import type { ActionDefault } from '../../../actions/actions';
import type { ActionSearchUpdate } from '../../../actions/search/search.actions';

describe('search.reducers', () => {
  describe('query', () => {
    it('should return default value', () => {
      const action: ActionDefault = { type: DEFAULT };
      const actual = query(undefined, action);
      expect(actual).toEqual('');
    });

    it('should return new query value', () => {
      const action: ActionSearchUpdate = {
        type: SEARCH_UPDATE,
        payload: {
          query: 'foo fighters',
          matches: [{ name: 'Artist1', mbid: 'mbid1' }],
        },
      };
      const actual = query(undefined, action);
      expect(actual).toEqual(action.payload.query);
    });
  });
});
