/** @format */

import { combineReducers } from 'redux';

import {
  SEARCH_QUERY_UPDATE,
  SEARCH_RESULTS_MATCHES_UPDATE,
  SEARCH_RESULTS_VISIBLE_TOGGLE,
} from '../../actions/search/search.actions';

export const matches = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case SEARCH_RESULTS_MATCHES_UPDATE:
      return payload;
    default:
      return state;
  }
};

export const visible = (state = false, action) => {
  const { type } = action;

  switch (type) {
    case SEARCH_RESULTS_VISIBLE_TOGGLE:
      return !state;
    case SEARCH_QUERY_UPDATE:
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
