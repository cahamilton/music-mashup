/** @format */

import loading from '../biography.loading.reducers';
import { DEFAULT } from '../../../actions/actions';
import {
  BIOGRAPHY_PENDING,
  BIOGRAPHY_UPDATE,
} from '../../../actions/biography/biography.actions';
import type { ActionDefault } from '../../../actions/actions';
import type {
  ActionBiographyPending,
  ActionBiographyUpdate,
} from '../../../actions/biography/biography.actions';

describe('biography.reducers', () => {
  describe('loading', () => {
    it('should return default value', () => {
      const action: ActionDefault = { type: DEFAULT };
      const actual = loading(undefined, action);
      const expected = false;
      expect(actual).toEqual(expected);
    });

    it('should return negated default value', () => {
      const action: ActionBiographyPending = { type: BIOGRAPHY_PENDING };
      const actual = loading(undefined, action);
      const expected = true;
      expect(actual).toEqual(expected);
    });

    it('should return negated value', () => {
      const action: ActionBiographyUpdate = { type: BIOGRAPHY_UPDATE };
      const actual = loading(true, action);
      const expected = false;
      expect(actual).toEqual(expected);
    });
  });
});
