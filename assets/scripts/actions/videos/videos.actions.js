/** @format */

import { post } from 'axios';
import logger from '../../utilities/logger';

export const VIDEOS_PENDING = 'VIDEOS_PENDING';
export const VIDEOS_UPDATE = 'VIDEOS_UPDATE';

/**
 * Update videos pending state
 * @returns {{type: string}}
 */
export const videosPending = () => ({
  type: VIDEOS_PENDING,
});

/**
 * Update videos
 * @param payload
 * @return {{payload: object, type: string}}
 */
export const videosUpdate = (payload = {}) => ({
  type: VIDEOS_UPDATE,
  payload,
});

/**
 * Trigger search for artist videos
 * @returns {function(*): Promise<void>}
 */
export const videosSearch = () => (dispatch, getState) => {
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
      const response = await post(url, { source });
      const { data } = response.data;

      dispatch(videosUpdate(data));
    } catch (error) {
      logger.error(error);

      dispatch(videosPending());
    }
  })();
};
