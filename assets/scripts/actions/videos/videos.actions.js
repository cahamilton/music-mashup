/** @format */

import { post } from 'axios';

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
  dispatch(videosPending());

  if (!source) {
    // Clear any existing content
    return dispatch(videosUpdate());
  }

  return (async () => {
    const url = `/api/videos/${musicBrainzId}`;

    try {
      const response = await post(url, { source });
      const { data } = response.data;

      dispatch(videosUpdate(data));
    } catch (error) {
      // TODO: Add logger
      // eslint-disable-next-line no-console
      console.log(error);
    }
  })();
};
