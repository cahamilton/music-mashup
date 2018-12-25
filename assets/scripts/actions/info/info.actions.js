export const INFO_UPDATE = 'INFO_UPDATE';

/**
 * Update artist info
 * @param payload {Object} - Artist info
 * @returns {{type: String, payload: Object}}
 */
export const infoUpdate = payload => ({
  type: INFO_UPDATE,
  payload,
});
