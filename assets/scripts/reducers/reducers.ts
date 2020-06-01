/** @format */

import { combineReducers } from 'redux';
import biography from './biography/biography.reducers';
import images from './images/images.reducers';
import info from './info/info.reducers';
import search from './search/search.reducers';
import videos from './videos/videos.reducers';

const rootReducer = combineReducers({
  biography,
  images,
  info,
  search,
  videos,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
