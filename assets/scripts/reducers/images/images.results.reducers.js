/** @format */

import { IMAGES_UPDATE } from '../../actions/images/images.actions';

const initialState = {
  source: null,
  items: [],
};

const results = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case IMAGES_UPDATE:
      return { ...initialState, ...payload };
    default:
      return state;
  }
};

export { initialState };
export default results;
