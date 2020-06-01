/** @format */

import { combineReducers } from 'redux';
import {
  SEARCH_RESULTS_VISIBLE_TOGGLE,
  SEARCH_UPDATE,
} from '../../actions/search/search.actions';
import type { SearchMatch } from '../../types/SearchMatch.type';
import type { ActionsSearchResults } from '../../actions/search/search.actions';

export type StateSearchResultsMatches = SearchMatch[];
export const initialStateMatches: StateSearchResultsMatches = [];

export type StateSearchResultsVisible = boolean;
export const initialStateVisible: StateSearchResultsVisible = false;

/**
 * @param state
 * @param action
 */
export const matches = (
  state = initialStateMatches,
  action: ActionsSearchResults,
): StateSearchResultsMatches => {
  switch (action.type) {
    case SEARCH_UPDATE:
      return action.payload.matches;
    default:
      return state;
  }
};

/**
 * @param state
 * @param action
 */
export const visible = (
  state = initialStateVisible,
  action: ActionsSearchResults,
): StateSearchResultsVisible => {
  switch (action.type) {
    case SEARCH_RESULTS_VISIBLE_TOGGLE:
      return !state;
    case SEARCH_UPDATE:
      return false;
    default:
      return state;
  }
};

const results = combineReducers({
  matches,
  visible,
});

export default results;
