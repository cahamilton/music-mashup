/** @format */

import { INFO_UPDATE } from '../../actions/info/info.actions';

const initialState = {
  name: null,
  mbid: null,
  genre: null,
  relationWikidata: null,
  relationYoutube: null,
};

const info = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case INFO_UPDATE:
      return { ...initialState, ...payload };
    default:
      return state;
  }
};

export { initialState };
export default info;
