/** @format */

import getImageSrc from '../getImageSrc';
import placeholder from '../placeholder.svg';

describe('getImageSrc', () => {
  const thumbnail = 'image-1x.jpg';

  it('should return src string', () => {
    const actual = getImageSrc(thumbnail);
    expect(actual).toEqual(thumbnail);
  });

  it('should return placeholder string', () => {
    const actual = getImageSrc('');
    expect(actual).toEqual(placeholder);
  });
});
