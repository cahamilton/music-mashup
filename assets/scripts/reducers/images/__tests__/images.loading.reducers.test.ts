/** @format */

import loading, { initialState } from '../images.loading.reducers';
import { DEFAULT } from '../../../actions/actions';
import {
  IMAGES_PENDING,
  IMAGES_UPDATE,
} from '../../../actions/images/images.actions';
import type { ActionDefault } from '../../../actions/actions';
import type {
  ActionImagesPending,
  ActionImagesUpdate,
} from '../../../actions/images/images.actions';

describe('images.reducers', () => {
  describe('loading', () => {
    it('should return default value', () => {
      const action: ActionDefault = { type: DEFAULT };
      const actual = loading(undefined, action);
      expect(actual).toEqual(initialState);
    });

    it('should return negated default value', () => {
      const action: ActionImagesPending = { type: IMAGES_PENDING };
      const actual = loading(undefined, action);
      expect(actual).toEqual(!initialState);
    });

    it('should return false', () => {
      const action: ActionImagesUpdate = { type: IMAGES_UPDATE };
      expect(loading(true, action)).toEqual(false);
      expect(loading(false, action)).toEqual(false);
    });
  });
});
