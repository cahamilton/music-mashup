/** @format */

import { SEARCH_QUERY_UPDATE } from '../../actions/search/search.actions';

const query = (state = '', action) => {
  const { type, payload } = action;

  switch (type) {
    case SEARCH_QUERY_UPDATE:
      return payload;
    default:
      return state;
  }
};

export default query;
