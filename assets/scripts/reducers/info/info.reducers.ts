/** @format */

import { INFO_UPDATE } from '../../actions/info/info.actions';
import type { ActionsInfo } from '../../actions/info/info.actions';

export interface StateInfo {
  name: string;
  mbid: string;
  genre?: string;
  relationWikidata?: string;
  relationYoutube?: string;
}

export const initialState: StateInfo = {
  name: '',
  mbid: '',
  genre: undefined,
  relationWikidata: undefined,
  relationYoutube: undefined,
};

const info = (state = initialState, action: ActionsInfo): StateInfo => {
  const { type, payload } = action;

  switch (type) {
    case INFO_UPDATE:
      return { ...initialState, ...payload };
    default:
      return state;
  }
};

export default info;
