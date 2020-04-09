/** @format */

import deepFreeze from 'deep-freeze';

import results, { initialState } from '../images.results.reducers';
import { IMAGES_UPDATE } from '../../../actions/images/images.actions';

describe('images.reducers', () => {
  describe('results', () => {
    const state = deepFreeze({
      source: 'https://image-library.com',
      items: [
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
    });

    it('should return initialState', () => {
      const action = { type: 'RANDOM' };
      const actual = results(undefined, action);
      expect(actual).toEqual(initialState);
    });

    it('should return initialState, if empty payload', () => {
      const action = deepFreeze({
        type: IMAGES_UPDATE,
        payload: {},
      });
      const actual = results(state, action);
      expect(actual).toEqual(initialState);
    });

    it('should return new state, that matches payload', () => {
      const action = deepFreeze({
        type: IMAGES_UPDATE,
        payload: {
          source: 'https://image-library.com',
          items: [
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
      });
      const actual = results(state, action);
      expect(actual).toEqual(action.payload);
    });
  });
});
