/** @format */

/* eslint-disable no-console */

/**
 * Message logger
 * @todo Add better error logging
 */
const logger = {
  log: (message) => console.log(message),
  warn: (message) => console.warn(message),
  info: (message) => console.info(message),
  error: (message) => console.error(message),
};

export default logger;
