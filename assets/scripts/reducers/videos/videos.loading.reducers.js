/** @format */

import {
  VIDEOS_PENDING,
  VIDEOS_UPDATE,
} from '../../actions/videos/videos.actions';

const loading = (state = false, action) => {
  const { type } = action;

  switch (type) {
    case VIDEOS_PENDING:
    case VIDEOS_UPDATE:
      return !state;
    default:
      return state;
  }
};

export default loading;
