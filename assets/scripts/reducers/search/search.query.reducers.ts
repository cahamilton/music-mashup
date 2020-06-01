/** @format */

import { SEARCH_UPDATE } from '../../actions/search/search.actions';
import type { ActionsSearchQuery } from '../../actions/search/search.actions';

export type StateSearchQuery = string;
export const initialState: StateSearchQuery = '';

const query = (state = initialState, action: ActionsSearchQuery) => {
  const { type, payload } = action;

  switch (type) {
    case SEARCH_UPDATE:
      return payload.query;
    default:
      return state;
  }
};

export default query;
