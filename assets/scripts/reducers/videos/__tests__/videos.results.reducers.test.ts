/** @format */

import deepFreeze from 'deep-freeze';
import results, { initialState } from '../videos.results.reducers';
import { DEFAULT } from '../../../actions/actions';
import { VIDEOS_UPDATE } from '../../../actions/videos/videos.actions';
import type { ActionDefault } from '../../../actions/actions';
import type { ActionVideosUpdate } from '../../../actions/videos/videos.actions';
import type { StateVideosResults } from '../videos.results.reducers';

describe('videos.reducers', () => {
  describe('results', () => {
    it('should return default value', () => {
      const action: ActionDefault = { type: DEFAULT };
      const actual = results(undefined, action);
      expect(actual).toEqual(initialState);
    });

    it('should return default value if empty payload', () => {
      const state: StateVideosResults = {
        playlistId: 'UUi2KNss4Yx73NG0JARSFe0A',
        nextPage: 'CAUQAA',
        items: [
          {
            id: 'PdDpbKX-N-4',
            title: 'Cal Jam 18 - More Good Times!',
            thumbnail: {
              '1x': 'image-1-1x.jpg',
              '2x': 'image-1-2x.jpg',
            },
          },
        ],
      };

      const action: ActionVideosUpdate = {
        type: VIDEOS_UPDATE,
      };

      deepFreeze(state);

      const actual = results(state, action);
      expect(actual).toEqual(initialState);
    });

    it('should return state that matches payload', () => {
      const state: StateVideosResults = {
        playlistId: 'UUi2KNss4Yx73NG0JARSFe0A',
        nextPage: 'CAUQAA',
        items: [
          {
            id: 'PdDpbKX-N-4',
            title: 'Cal Jam 18 - More Good Times!',
            thumbnail: {
              '1x': 'image-1-1x.jpg',
              '2x': 'image-1-2x.jpg',
            },
          },
        ],
      };

      const action: ActionVideosUpdate = {
        type: VIDEOS_UPDATE,
        payload: {
          playlistId: 'UUGGhM6XCSJFQ6DTRffnKRIw',
          nextPage: 'CAUQAA',
          items: [
            {
              id: 'nO4aXkR0ZY4',
              title: 'Origin of Muse: Origin of Symmetry Era [Out Now]',
              thumbnail: {
                '1x': 'image-1-1x.jpg',
                '2x': 'image-1-2x.jpg',
              },
            },
            {
              id: 'KKHLLE6qXaw',
              title: 'Origin of Muse: Showbiz Era [Boxset Out Now]',
              thumbnail: {
                '1x': 'image-2-1x.jpg',
                '2x': 'image-2-2x.jpg',
              },
            },
          ],
        },
      };

      deepFreeze(state);

      const actual = results(state, action);
      expect(actual).toEqual(action.payload);
    });
  });
});
