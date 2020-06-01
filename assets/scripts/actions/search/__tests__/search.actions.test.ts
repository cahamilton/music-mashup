/** @format */

import {
  SEARCH_PENDING,
  SEARCH_RESULTS_VISIBLE_TOGGLE,
  SEARCH_UPDATE,
  searchPending,
  searchResultsVisibleToggle,
  searchUpdate,
} from '../search.actions';
import type {
  ActionSearchPending,
  ActionSearchResultsToggle,
  ActionSearchUpdate,
} from '../search.actions';

describe('search.actions', () => {
  test('searchPending', () => {
    const expected: ActionSearchPending = {
      type: SEARCH_PENDING,
    };
    const action = searchPending();
    expect(action).toEqual(expected);
  });

  test('searchQuery', () => {
    const payload = {
      query: 'muse',
      matches: [],
    };
    const expected: ActionSearchUpdate = {
      type: SEARCH_UPDATE,
      payload,
    };
    const action = searchUpdate(payload);
    expect(action).toEqual(expected);
  });

  test('searchResultsVisibleToggle', () => {
    const expected: ActionSearchResultsToggle = {
      type: SEARCH_RESULTS_VISIBLE_TOGGLE,
    };
    const action = searchResultsVisibleToggle();
    expect(action).toEqual(expected);
  });
});
