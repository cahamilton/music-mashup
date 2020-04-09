/** @format */

import { get } from 'axios';
import logger from '../../utilities/logger';

export const IMAGES_PENDING = 'IMAGES_PENDING';
export const IMAGES_UPDATE = 'IMAGES_UPDATE';

/**
 * Update images pending state
 * @returns {{type: string}}
 */
export const imagesPending = () => ({
  type: IMAGES_PENDING,
});

/**
 * Update images
 * @param payload
 * @return {{payload: object, type: string}}
 */
export const imagesUpdate = (payload = {}) => ({
  type: IMAGES_UPDATE,
  payload,
});

/**
 * Trigger search for artist images
 * @returns {function(*): Promise<void>}
 */
export const imagesSearch = () => (dispatch, getState) => {
  const state = getState();
  const musicBrainzId = state.info.mbid;

  if (!musicBrainzId) {
    dispatch(imagesUpdate());
    return false;
  }

  return (async () => {
    try {
      dispatch(imagesPending());

      const url = `/api/images/${musicBrainzId}`;
      const response = await get(url);
      const { data } = response.data;

      dispatch(imagesUpdate(data));
    } catch (error) {
      logger.error(error);

      dispatch(imagesPending());
    }
  })();
};
