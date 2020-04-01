/** @format */

import { combineReducers } from 'redux';

import {
  SEARCH_RESULTS_VISIBLE_TOGGLE,
  SEARCH_UPDATE,
} from '../../actions/search/search.actions';

export const matches = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case SEARCH_UPDATE:
      return payload.matches;
    default:
      return state;
  }
};

export const visible = (state = false, action) => {
  const { type } = action;

  switch (type) {
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
