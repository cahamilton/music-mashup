/** @format */

import { matches, visible } from '../search.results.reducers';
import { DEFAULT } from '../../../actions/actions';
import {
  SEARCH_RESULTS_VISIBLE_TOGGLE,
  SEARCH_UPDATE,
} from '../../../actions/search/search.actions';
import type { ActionDefault } from '../../../actions/actions';
import type {
  ActionSearchResultsToggle,
  ActionSearchUpdate,
} from '../../../actions/search/search.actions';

describe('search.reducers', () => {
  describe('matches', () => {
    it('should return default value', () => {
      const action: ActionDefault = { type: DEFAULT };
      const actual = matches(undefined, action);
      expect(actual).toEqual([]);
    });

    it('should return new value', () => {
      const action: ActionSearchUpdate = {
        type: SEARCH_UPDATE,
        payload: {
          query: 'foo fighters',
          matches: [{ name: 'Artist1', mbid: 'mbid1' }],
        },
      };
      const actual = matches(undefined, action);
      expect(actual).toEqual(action.payload.matches);
    });
  });

  describe('visible', () => {
    it('should return default value', () => {
      const action: ActionDefault = { type: DEFAULT };
      const actual = visible(undefined, action);
      expect(actual).toEqual(false);
    });

    it('should return negated default value', () => {
      const action: ActionSearchResultsToggle = {
        type: SEARCH_RESULTS_VISIBLE_TOGGLE,
      };
      const actual = visible(undefined, action);
      expect(actual).toEqual(true);
    });

    it('should return return false', () => {
      const action: ActionSearchUpdate = {
        type: SEARCH_UPDATE,
        payload: {
          query: 'foo fighters',
          matches: [{ name: 'Artist1', mbid: 'mbid1' }],
        },
      };
      const actual = visible(undefined, action);
      expect(actual).toEqual(false);
    });
  });
});
