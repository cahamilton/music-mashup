/** @format */

import { VIDEOS_UPDATE } from '../../actions/videos/videos.actions';

const results = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case VIDEOS_UPDATE:
      return payload;
    default:
      return state;
  }
};

export default results;
