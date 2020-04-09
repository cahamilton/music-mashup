/** @format */

import { combineReducers } from 'redux';

import loading from './images.loading.reducers';
import results from './images.results.reducers';

const images = combineReducers({
  loading,
  results,
});

export default images;
