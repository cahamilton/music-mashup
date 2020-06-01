/** @format */

import {
  VIDEOS_PENDING,
  VIDEOS_UPDATE,
} from '../../actions/videos/videos.actions';
import type { ActionsVideosLoading } from '../../actions/videos/videos.actions';

export type StateVideosLoading = boolean;

export const initialState: StateVideosLoading = false;

const loading = (
  state = initialState,
  action: ActionsVideosLoading,
): StateVideosLoading => {
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
