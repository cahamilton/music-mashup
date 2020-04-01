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
 * @param {string} musicBrainzId - Artist MusicBrainz ID
 * @param {string} source - Relationship URL
 * @returns {function(*): Promise<void>}
 */
export const videosSearch = (musicBrainzId, source) => (dispatch) => {
  if (!musicBrainzId || !source) {
    dispatch(videosUpdate());
    return false;
  }

  dispatch(videosPending());

  return (async () => {
    const url = `/api/videos/${musicBrainzId}`;

    try {
      const response = await post(url, { source });
      const { data } = response.data;

      dispatch(videosUpdate(data));
    } catch (error) {
      logger.error(error);
    } finally {
      dispatch(videosPending());
    }
  })();
};
