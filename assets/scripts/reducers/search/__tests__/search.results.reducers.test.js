/** @format */

import { matches, visible } from '../search.results.reducers';

import {
  SEARCH_RESULTS_VISIBLE_TOGGLE,
  SEARCH_UPDATE,
} from '../../../actions/search/search.actions';

describe('search.reducers', () => {
  describe('matches', () => {
    it('should return default value', () => {
      const action = { type: 'RANDOM' };
      const actual = matches(undefined, action);
      expect(actual).toEqual([]);
    });

    it('should return new value', () => {
      const action = {
        type: SEARCH_UPDATE,
        payload: {
          query: 'foo fighters',
          matches: [{ name: 'Artist1' }, { name: 'Artist2' }],
        },
      };
      const actual = matches(undefined, action);
      expect(actual).toEqual(action.payload.matches);
    });
  });

  describe('visible', () => {
    it('should return default value', () => {
      const action = { type: 'RANDOM' };
      const actual = visible(undefined, action);
      expect(actual).toEqual(false);
    });

    it('should return negated default value', () => {
      const action = { type: SEARCH_RESULTS_VISIBLE_TOGGLE };
      const actual = visible(undefined, action);
      expect(actual).toEqual(true);
    });

    it('should return return false', () => {
      const action = { type: SEARCH_UPDATE };
      const actual = visible(undefined, action);
      expect(actual).toEqual(false);
    });
  });
});
