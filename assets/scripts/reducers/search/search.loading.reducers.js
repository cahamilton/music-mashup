import {
  SEARCH_PENDING,
} from '../../actions/search/search.actions';

const loading = (state = false, action) => {
  const { type } = action;

  switch (type) {
    case SEARCH_PENDING:
      return !state;
    default:
      return state;
  }
};

export default loading;
