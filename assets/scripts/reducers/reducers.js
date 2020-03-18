/** @format */

import { combineReducers } from 'redux';

import info from './info/info.reducers';
import search from './search/search.reducers';

export default combineReducers({
  info,
  search,
});
