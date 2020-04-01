/** @format */

import {
  VIDEOS_PENDING,
  VIDEOS_UPDATE,
} from '../../actions/videos/videos.actions';

const loading = (state = false, action) => {
  const { type } = action;

  switch (type) {
    case VIDEOS_PENDING:
      return !state;
    case VIDEOS_UPDATE:
      return false;
    default:
      return state;
  }
};

export default loading;
