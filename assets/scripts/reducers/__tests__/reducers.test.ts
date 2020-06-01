/** @format */

import { createStore } from 'redux';
import rootReducer from '../reducers';

describe('reducers', () => {
  const store = createStore(rootReducer);

  it('should contain a key for each child reducer', () => {
    const state = store.getState();
    const stateKeys = Object.keys(state);
    const reducers = ['biography', 'images', 'info', 'search', 'videos'];

    expect(stateKeys).toHaveLength(reducers.length);
    expect(stateKeys).toEqual(expect.arrayContaining(reducers));
  });
});
