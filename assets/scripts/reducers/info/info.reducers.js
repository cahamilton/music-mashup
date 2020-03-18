/** @format */

import { INFO_UPDATE } from '../../actions/info/info.actions';

const info = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case INFO_UPDATE:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default info;
