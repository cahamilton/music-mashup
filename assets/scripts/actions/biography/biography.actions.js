/** @format */

import { post } from 'axios';

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
 * @returns {function(*): Promise<any>}
 */
export const biographySearch = (musicBrainzId, source) => (dispatch) => {
  dispatch(biographyPending());

  if (!source) {
    // Clear any existing content
    return dispatch(biographyUpdate());
  }

  return (async () => {
    const url = `/api/biography/${musicBrainzId}`;

    try {
      const response = await post(url, { source });
      const { data } = response.data;
      dispatch(biographyUpdate(data));
    } catch (error) {
      // TODO: Add logger
      // eslint-disable-next-line no-console
      console.log(error);
    }
  })();
};
