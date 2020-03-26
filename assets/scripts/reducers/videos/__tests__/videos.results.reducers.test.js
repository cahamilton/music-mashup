/** @format */

import deepFreeze from 'deep-freeze';

import results from '../videos.results.reducers';
import { VIDEOS_UPDATE } from '../../../actions/videos/videos.actions';

describe('videos.reducers', () => {
  describe('results', () => {
    it('should return default value', () => {
      const initialState = undefined;
      const action = { type: 'RANDOM' };
      const actual = results(initialState, action);
      expect(actual).toEqual({});
    });

    it('should return state that matches payload', () => {
      const initialState = deepFreeze({
        playlistId: 'UUi2KNss4Yx73NG0JARSFe0A',
        nextPage: 'CAUQAA',
        items: [
          {
            id: 'PdDpbKX-N-4',
            title: 'Cal Jam 18 - More Good Times!',
            thumbnail: { '1x': 'image-1-1x.jpg', '2x': 'image-1-2x.jpg' },
          },
        ],
      });
      const action = deepFreeze({
        type: VIDEOS_UPDATE,
        payload: {
          playlistId: 'UUGGhM6XCSJFQ6DTRffnKRIw',
          nextPage: 'CAUQAA',
          items: [
            {
              id: 'nO4aXkR0ZY4',
              title: 'Origin of Muse: Origin of Symmetry Era [Out Now]',
              thumbnail: { '1x': 'image-1-1x.jpg', '2x': 'image-1-2x.jpg' },
            },
            {
              id: 'KKHLLE6qXaw',
              title: 'Origin of Muse: Showbiz Era [Boxset Out Now]',
              thumbnail: { '1x': 'image-2-1x.jpg', '2x': 'image-2-2x.jpg' },
            },
          ],
        },
      });
      const actual = results(initialState, action);
      expect(actual).toEqual(action.payload);
    });
  });
});
