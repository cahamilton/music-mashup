/** @format */

import { combineReducers } from 'redux';

import content from './biography.content.reducers';
import loading from './biography.loading.reducers';

const biography = combineReducers({
  content,
  loading,
});

export default biography;
