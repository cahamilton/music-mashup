/** @format */

import { VIDEOS_UPDATE } from '../../actions/videos/videos.actions';
import type { ActionsVideosResults } from '../../actions/videos/videos.actions';
import type { AssetImage } from '../../types/AssetImage.type';

export interface StateVideosResults {
  items: AssetImage[];
  nextPage?: string;
  playlistId?: string;
}

export const initialState: StateVideosResults = {
  items: [],
  nextPage: undefined,
  playlistId: undefined,
};

const results = (
  state = initialState,
  action: ActionsVideosResults,
): StateVideosResults => {
  const { type, payload } = action;

  switch (type) {
    case VIDEOS_UPDATE:
      return { ...initialState, ...payload };
    default:
      return state;
  }
};

export default results;
