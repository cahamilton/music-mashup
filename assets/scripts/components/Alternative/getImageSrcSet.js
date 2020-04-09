/** @format */

/**
 * Return srcSet string if multiple sizes available
 * @param {String} thumbnail
 * @param {String} thumbnailRetina
 * @return {string} srcSet
 */
const getImageSrcSet = (thumbnail, thumbnailRetina) => {
  if (!thumbnail && !thumbnailRetina) {
    return '';
  }

  return `${thumbnail} 1x, ${thumbnailRetina} 2x`;
};

export default getImageSrcSet;
