/** @format */

import { BIOGRAPHY_UPDATE } from '../../actions/biography/biography.actions';
import type { ActionsBiographyContent } from '../../actions/biography/biography.actions';

export interface StateBiographyContent {
  extract?: string;
  image?: string;
  source?: string;
}

export const initialState: StateBiographyContent = {};

const content = (state = initialState, action: ActionsBiographyContent) => {
  const { type, payload } = action;

  switch (type) {
    case BIOGRAPHY_UPDATE:
      return payload;
    default:
      return state;
  }
};

export default content;
