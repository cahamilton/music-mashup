/** @format */

import { combineReducers } from 'redux';

import biography from './biography/biography.reducers';
import info from './info/info.reducers';
import search from './search/search.reducers';
import videos from './videos/videos.reducers';

export default combineReducers({
  biography,
  info,
  search,
  videos,
});
