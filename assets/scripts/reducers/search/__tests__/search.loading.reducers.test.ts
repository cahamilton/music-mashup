/** @format */

import loading from '../search.loading.reducers';
import { DEFAULT } from '../../../actions/actions';
import { SEARCH_PENDING } from '../../../actions/search/search.actions';
import { INFO_UPDATE } from '../../../actions/info/info.actions';
import type { ActionDefault } from '../../../actions/actions';
import type { ActionSearchPending } from '../../../actions/search/search.actions';
import type { ActionInfoUpdate } from '../../../actions/info/info.actions';

describe('search.reducers', () => {
  describe('loading', () => {
    it('should return default value', () => {
      const action: ActionDefault = { type: DEFAULT };
      const actual = loading(undefined, action);
      expect(actual).toEqual(false);
    });

    it('should return negated default value', () => {
      const action: ActionSearchPending = { type: SEARCH_PENDING };
      const actual = loading(undefined, action);
      expect(actual).toEqual(true);
    });

    it('should return false', () => {
      const action: ActionInfoUpdate = {
        type: INFO_UPDATE,
        payload: {
          name: 'Muse',
          mbid: 'fd857293-5ab8-40de-b29e-55a69d4e4d0f',
        },
      };
      const actual = loading(true, action);
      expect(actual).toEqual(false);
    });
  });
});
