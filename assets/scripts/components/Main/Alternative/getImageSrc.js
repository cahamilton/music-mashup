/** @format */

import placeholder from './placeholder.svg';

/**
 * Return image src, or placeholder if unavailable
 * @param {String} thumbnail
 * @return {String}
 */
const getImageSrc = (thumbnail) => {
  if (!thumbnail) {
    return placeholder;
  }

  return thumbnail;
};

export default getImageSrc;
