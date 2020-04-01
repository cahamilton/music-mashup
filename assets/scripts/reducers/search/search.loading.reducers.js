/** @format */

import { INFO_UPDATE } from '../../actions/info/info.actions';
import { SEARCH_PENDING } from '../../actions/search/search.actions';

const loading = (state = false, action) => {
  const { type } = action;

  switch (type) {
    case SEARCH_PENDING:
      return !state;
    case INFO_UPDATE:
      return false;
    default:
      return state;
  }
};

export default loading;
