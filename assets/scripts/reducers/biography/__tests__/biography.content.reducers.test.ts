/** @format */

import content from '../biography.content.reducers';
import { DEFAULT } from '../../../actions/actions';
import { BIOGRAPHY_UPDATE } from '../../../actions/biography/biography.actions';
import type { ActionDefault } from '../../../actions/actions';
import type { ActionBiographyUpdate } from '../../../actions/biography/biography.actions';

describe('biography.reducers', () => {
  describe('content', () => {
    it('should return default value', () => {
      const action: ActionDefault = { type: DEFAULT };
      const actual = content(undefined, action);
      const expected = {};
      expect(actual).toEqual(expected);
    });

    it('should return new biography info', () => {
      const action: ActionBiographyUpdate = {
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
