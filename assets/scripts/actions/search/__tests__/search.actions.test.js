/** @format */

import {
  SEARCH_PENDING,
  SEARCH_RESULTS_VISIBLE_TOGGLE,
  SEARCH_UPDATE,
  searchPending,
  searchResultsVisibleToggle,
  searchUpdate,
} from '../search.actions';

describe('search.actions', () => {
  test('searchPending', () => {
    const action = searchPending();
    expect(action).toEqual({ type: SEARCH_PENDING });
  });

  test('searchQuery', () => {
    const data = { query: 'muse', matches: [] };
    const action = searchUpdate(data);
    expect(action).toEqual({ type: SEARCH_UPDATE, payload: data });
  });

  test('searchResultsVisibleToggle', () => {
    const action = searchResultsVisibleToggle();
    expect(action).toEqual({ type: SEARCH_RESULTS_VISIBLE_TOGGLE });
  });
});
