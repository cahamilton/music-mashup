/** @format */

import reducers from '../../reducers';

import { INFO_UPDATE } from '../../../actions/info/info.actions';

describe('info.reducers', () => {
  test(INFO_UPDATE, () => {
    const state = {
      info: {},
    };
    const action = {
      type: INFO_UPDATE,
      payload: {
        name: 'Muse',
        mbid: 'fd857293-5ab8-40de-b29e-55a69d4e4d0f',
        genre: 'Alternative Rock',
      },
    };
    const expected = {
      info: action.payload,
    };
    const store = reducers(state, action);
    expect(store.info).toEqual(expected.info);
  });
});
