/** @format */

import {
  BIOGRAPHY_PENDING,
  BIOGRAPHY_UPDATE,
} from '../../actions/biography/biography.actions';
import type { ActionsBiographyLoading } from '../../actions/biography/biography.actions';

export type StateBiographyLoading = boolean;

export const initialState: StateBiographyLoading = false;

const loading = (
  state = initialState,
  action: ActionsBiographyLoading,
): StateBiographyLoading => {
  const { type } = action;

  switch (type) {
    case BIOGRAPHY_PENDING:
    case BIOGRAPHY_UPDATE:
      return !state;
    default:
      return state;
  }
};

export default loading;
