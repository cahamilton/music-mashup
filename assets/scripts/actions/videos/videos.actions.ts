/** @format */

import axios, { AxiosResponse } from 'axios';
import type { Action } from 'redux';
import type { ActionDefault } from '../actions';
import type { AppThunk } from '../../types/AppThunk.type';
import type { StateVideosResults } from '../../reducers/videos/videos.results.reducers';
import logger from '../../utilities/logger';

export const VIDEOS_PENDING = 'VIDEOS_PENDING';
export const VIDEOS_UPDATE = 'VIDEOS_UPDATE';

export interface ActionVideosPending extends Action {
  type: typeof VIDEOS_PENDING;
}

export interface ActionVideosUpdate extends Action {
  type: typeof VIDEOS_UPDATE;
  payload?: StateVideosResults;
}

export type ActionsVideosLoading =
  | ActionDefault
  | ActionVideosPending
  | ActionVideosUpdate;
export type ActionsVideosResults = ActionDefault | ActionVideosUpdate;

/**
 * Update videos pending state
 */
export const videosPending = (): ActionVideosPending => ({
  type: VIDEOS_PENDING,
});

/**
 * Update videos
 * @param payload
 */
export const videosUpdate = (
  payload?: StateVideosResults,
): ActionVideosUpdate => ({
  type: VIDEOS_UPDATE,
  payload,
});

/**
 * Trigger search for artist videos
 */
export const videosSearch = (): AppThunk<Promise<void> | boolean> => {
  return (dispatch, getState) => {
    const state = getState();
    const musicBrainzId = state.info.mbid;
    const source = state.info.relationYoutube;

    if (!musicBrainzId || !source) {
      dispatch(videosUpdate());
      return false;
    }

    return (async () => {
      try {
        dispatch(videosPending());

        const url = `/api/videos/${musicBrainzId}`;
        const response: AxiosResponse = await axios.post(url, { source });
        const { data } = response.data;

        dispatch(videosUpdate(data));
      } catch (error) {
        logger.error(error);

        dispatch(videosPending());
      }
    })();
  };
};
