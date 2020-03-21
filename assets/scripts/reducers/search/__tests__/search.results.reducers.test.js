/** @format */

import { matches, visible } from '../search.results.reducers';

import {
  SEARCH_PENDING,
  SEARCH_QUERY_UPDATE,
  SEARCH_RESULTS_MATCHES_UPDATE,
  SEARCH_RESULTS_VISIBLE_TOGGLE,
} from '../../../actions/search/search.actions';

describe('search.reducers', () => {
  describe('matches', () => {
    it('should return default value', () => {
      const action = { type: SEARCH_QUERY_UPDATE };
      const actual = matches(undefined, action);
      const expected = [];
      expect(actual).toEqual(expected);
    });

    it('should return new array of matches', () => {
      const action = {
        type: SEARCH_RESULTS_MATCHES_UPDATE,
        payload: [
          {
            name: 'Foo Fighters',
            mbid: '67f66c07-6e61-4026-ade5-7e782fad3a5d',
            thumbnail: {
              '1x': 'image-1x.jpg',
              '2x': 'image-2x.jpg',
            },
          },
        ],
      };
      const actual = matches(undefined, action);
      const expected = action.payload;
      expect(actual).toEqual(expected);
    });
  });

  describe('visible', () => {
    it('should return default value', () => {
      const action = { type: SEARCH_PENDING };
      const expected = false;
      const actual = visible(undefined, action);
      expect(actual).toEqual(expected);
    });

    it('should return negated default value', () => {
      const action = { type: SEARCH_RESULTS_VISIBLE_TOGGLE };
      const expected = true;
      const actual = visible(undefined, action);
      expect(actual).toEqual(expected);
    });

    it('should return return false', () => {
      const action = { type: SEARCH_QUERY_UPDATE };
      const expected = false;
      const actual = visible(undefined, action);
      expect(actual).toEqual(expected);
    });
  });
});
