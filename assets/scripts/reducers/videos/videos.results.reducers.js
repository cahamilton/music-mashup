/** @format */

import { VIDEOS_UPDATE } from '../../actions/videos/videos.actions';

const initialState = {
  playlistId: null,
  nextPage: null,
  items: [],
};

const results = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case VIDEOS_UPDATE:
      return { ...initialState, ...payload };
    default:
      return state;
  }
};

export { initialState };
export default results;
