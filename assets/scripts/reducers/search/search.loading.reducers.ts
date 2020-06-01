/** @format */

import { INFO_UPDATE } from '../../actions/info/info.actions';
import { SEARCH_PENDING } from '../../actions/search/search.actions';
import type { ActionsSearchLoading } from '../../actions/search/search.actions';

export type StateSearchLoading = boolean;
export const initialState: StateSearchLoading = false;

const loading = (
  state = initialState,
  action: ActionsSearchLoading,
): StateSearchLoading => {
  const { type } = action;

  switch (type) {
    case SEARCH_PENDING:
      return !state;
    case INFO_UPDATE:
      return false;
    default:
      return state;
  }
};

export default loading;
