/** @format */

import { combineReducers } from 'redux';
import loading from './videos.loading.reducers';
import results from './videos.results.reducers';

const videos = combineReducers({
  loading,
  results,
});

export default videos;
