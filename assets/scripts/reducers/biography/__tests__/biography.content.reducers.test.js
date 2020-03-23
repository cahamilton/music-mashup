/** @format */

import content from '../biography.content.reducers';

import { BIOGRAPHY_UPDATE } from '../../../actions/biography/biography.actions';

describe('biography.reducers', () => {
  describe('content', () => {
    it('should return default value', () => {
      const action = { type: 'RANDOM_ACTION' };
      const actual = content(undefined, action);
      const expected = {};
      expect(actual).toEqual(expected);
    });

    it('should return new biography info', () => {
      const action = {
        type: BIOGRAPHY_UPDATE,
        payload: {
          extract: 'Lorem ipsum la la la.',
          image: 'image-1.jpg',
          source: 'https://someradsite.com',
        },
      };
      const actual = content(undefined, action);
      const expected = action.payload;
      expect(actual).toEqual(expected);
    });
  });
});
