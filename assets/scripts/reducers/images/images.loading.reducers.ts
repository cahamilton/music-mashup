/** @format */

import {
  IMAGES_PENDING,
  IMAGES_UPDATE,
} from '../../actions/images/images.actions';
import type { ActionsImagesLoading } from '../../actions/images/images.actions';

export type StateImagesLoading = boolean;

export const initialState: StateImagesLoading = false;

const loading = (state = initialState, action: ActionsImagesLoading) => {
  const { type } = action;

  switch (type) {
    case IMAGES_PENDING:
      return !state;
    case IMAGES_UPDATE:
      return false;
    default:
      return state;
  }
};

export default loading;
