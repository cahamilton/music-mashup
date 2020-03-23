/** @format */

import { BIOGRAPHY_UPDATE } from '../../actions/biography/biography.actions';

const content = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case BIOGRAPHY_UPDATE:
      return payload;
    default:
      return state;
  }
};

export default content;
