/** @format */

import { IMAGES_UPDATE } from '../../actions/images/images.actions';
import type { AssetImage } from '../../types/AssetImage.type';
import type { ActionsImagesResults } from '../../actions/images/images.actions';

export interface StateImagesResults {
  source?: string;
  images?: AssetImage[];
}

export const initialState: StateImagesResults = {
  source: '',
  images: [],
};

const results = (state = initialState, action: ActionsImagesResults) => {
  const { type, payload } = action;

  switch (type) {
    case IMAGES_UPDATE:
      return { ...initialState, ...payload };
    default:
      return state;
  }
};

export default results;
