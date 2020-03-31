/** @format */

import { VIDEOS_PENDING } from '../../actions/videos/videos.actions';

const loading = (state = false, action) => {
  const { type } = action;

  switch (type) {
    case VIDEOS_PENDING:
      return !state;
    default:
      return state;
  }
};

export default loading;
