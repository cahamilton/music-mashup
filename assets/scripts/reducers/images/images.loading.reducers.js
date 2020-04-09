/** @format */

import {
  IMAGES_PENDING,
  IMAGES_UPDATE,
} from '../../actions/images/images.actions';

const initialState = false;

const loading = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case IMAGES_PENDING:
      return !state;
    case IMAGES_UPDATE:
      return false;
    default:
      return state;
  }
};

export { initialState };
export default loading;
