/** @format */

import { post } from 'axios';
import logger from '../../utilities/logger';

export const BIOGRAPHY_PENDING = 'BIOGRAPHY_PENDING';
export const BIOGRAPHY_UPDATE = 'BIOGRAPHY_UPDATE';

/**
 * Update biography pending state
 * @returns {{type: string}}
 */
export const biographyPending = () => ({
  type: BIOGRAPHY_PENDING,
});

/**
 * Update biography
 * @param payload
 * @return {{payload: object, type: string}}
 */
export const biographyUpdate = (payload = {}) => ({
  type: BIOGRAPHY_UPDATE,
  payload,
});

/**
 * Trigger search for artist biography
 * @param {string} musicBrainzId - Artist MusicBrainz ID
 * @param {string} source - Relationship URL
 * @returns {function(*): Promise<void>}
 */
export const biographySearch = (musicBrainzId, source) => (dispatch) => {
  dispatch(biographyPending());

  if (!source) {
    // Clear any existing content
    dispatch(biographyUpdate());
    return false;
  }

  return (async () => {
    const url = `/api/biography/${musicBrainzId}`;

    try {
      const response = await post(url, { source });
      const { data } = response.data;

      dispatch(biographyUpdate(data));
    } catch (error) {
      logger.error(error);
    }
  })();
};
