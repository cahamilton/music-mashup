/** @format */

import { SEARCH_UPDATE } from '../../actions/search/search.actions';

const query = (state = '', action) => {
  const { type, payload } = action;

  switch (type) {
    case SEARCH_UPDATE:
      return payload.query;
    default:
      return state;
  }
};

export default query;
