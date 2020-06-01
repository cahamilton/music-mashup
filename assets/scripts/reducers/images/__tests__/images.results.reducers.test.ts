/** @format */

import deepFreeze from 'deep-freeze';
import results, { initialState } from '../images.results.reducers';
import { DEFAULT } from '../../../actions/actions';
import { IMAGES_UPDATE } from '../../../actions/images/images.actions';
import type { ActionDefault } from '../../../actions/actions';
import type { ActionImagesUpdate } from '../../../actions/images/images.actions';
import type { StateImagesResults } from '../images.results.reducers';

describe('images.reducers', () => {
  describe('results', () => {
    const state: StateImagesResults = {
      source: 'https://image-library.com',
      images: [
        {
          id: '1234',
          title: 'Some rad band',
          thumbnail: {
            '1x': 'https://image-library.com/thumb-11.jpg',
            '2x': 'https://image-library.com/thumb-12.jpg',
          },
          url: 'https://image-library.com/image-1.jpg',
        },
      ],
    };

    deepFreeze(state);

    it('should return initialState', () => {
      const action: ActionDefault = { type: DEFAULT };
      const actual = results(undefined, action);
      expect(actual).toEqual(initialState);
    });

    it('should return initialState, if empty payload', () => {
      const action: ActionImagesUpdate = {
        type: IMAGES_UPDATE,
        payload: {},
      };
      const actual = results(state, action);
      expect(actual).toEqual(initialState);
    });

    it('should return new state, that matches payload', () => {
      const action: ActionImagesUpdate = {
        type: IMAGES_UPDATE,
        payload: {
          source: 'https://image-library.com',
          images: [
            {
              id: '4321',
              title: 'Some other rad band',
              thumbnail: {
                '1x': 'https://image-library.com/thumb-21.jpg',
                '2x': 'https://image-library.com/thumb-22.jpg',
              },
              url: 'https://image-library.com/image-2.jpg',
            },
          ],
        },
      };
      const actual = results(state, action);
      expect(actual).toEqual(action.payload);
    });
  });
});
