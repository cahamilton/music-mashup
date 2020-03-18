/** @format */

import {
  SEARCH_PENDING,
  SEARCH_QUERY_UPDATE,
  SEARCH_RESULTS_MATCHES_UPDATE,
  SEARCH_RESULTS_VISIBLE_TOGGLE,
  searchPending,
  searchQueryUpdate,
  searchResultsMatchesUpdate,
  searchResultsVisibleToggle,
} from '../search.actions';

describe('search.actions', () => {
  test('searchPending', () => {
    const action = searchPending();
    expect(action).toEqual({ type: SEARCH_PENDING });
  });

  test('searchQueryUpdate', () => {
    const action = searchQueryUpdate('muse');
    expect(action).toEqual({ type: SEARCH_QUERY_UPDATE, payload: 'muse' });
  });

  test('searchResultsMatchesUpdate', () => {
    const action = searchResultsMatchesUpdate(['Muse', 'Foo Fighters']);
    expect(action).toEqual({
      type: SEARCH_RESULTS_MATCHES_UPDATE,
      payload: ['Muse', 'Foo Fighters'],
    });
  });

  test('searchResultsVisibleToggle', () => {
    const action = searchResultsVisibleToggle();
    expect(action).toEqual({ type: SEARCH_RESULTS_VISIBLE_TOGGLE });
  });
});
