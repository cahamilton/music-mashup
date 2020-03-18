/** @format */

import { combineReducers } from 'redux';

import loading from './search.loading.reducers';
import query from './search.query.reducers';
import results from './search.results.reducers';

const search = combineReducers({
  loading,
  query,
  results,
});

export default search;
