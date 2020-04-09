/** @format */

import getImageSrcSet from '../getImageSrcSet';

describe('getImageSrcSet', () => {
  const thumbnail = 'image-1x.jpg';
  const thumbnailRetina = 'image-2x.jpg';

  it('should return srcSet string', () => {
    const actual = getImageSrcSet(thumbnail, thumbnailRetina);
    expect(actual).toEqual(`${thumbnail} 1x, ${thumbnailRetina} 2x`);
  });

  it('should return empty string', () => {
    const actual = getImageSrcSet('', '');
    expect(actual).toEqual('');
  });
});
