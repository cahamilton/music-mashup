/** @format */

import {
  BIOGRAPHY_PENDING,
  BIOGRAPHY_UPDATE,
} from '../../actions/biography/biography.actions';

const loading = (state = false, action) => {
  const { type } = action;

  switch (type) {
    case BIOGRAPHY_PENDING:
    case BIOGRAPHY_UPDATE:
      return !state;
    default:
      return state;
  }
};

export default loading;
