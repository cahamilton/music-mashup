/** @format */

import deepFreeze from 'deep-freeze';

import info from '../info.reducers';
import { INFO_UPDATE } from '../../../actions/info/info.actions';
import { SEARCH_PENDING } from '../../../actions/search/search.actions';

describe('info.reducers', () => {
  const initialState = deepFreeze({
    name: 'Muse',
    mbid: 'fd857293-5ab8-40de-b29e-55a69d4e4d0f',
    genre: 'Alternative Rock',
    bio: 'Lorem ipsum dolor sit amet.',
  });

  it('should return default state', () => {
    const action = { type: SEARCH_PENDING };
    const actual = info(undefined, action);
    const expected = {};
    expect(actual).toEqual(expected);
  });

  it('should return existing state', () => {
    const action = { type: SEARCH_PENDING };
    const actual = info(initialState, action);
    const expected = initialState;
    expect(actual).toEqual(expected);
  });

  it('should return new state', () => {
    const action = {
      type: INFO_UPDATE,
      payload: {
        name: 'Foo Fighters',
        mbid: '67f66c07-6e61-4026-ade5-7e782fad3a5d',
        genre: 'Rock',
        bio: 'Lorem ipsum dolor sit amet.',
      },
    };
    const actual = info(initialState, action);
    const expected = action.payload;
    expect(actual).toEqual(expected);
  });

  it('should not return items from previous state (no genre)', () => {
    const action = {
      type: INFO_UPDATE,
      payload: {
        name: 'Foo Fighters',
        mbid: '67f66c07-6e61-4026-ade5-7e782fad3a5d',
        bio: 'Lorem ipsum dolor sit amet.',
      },
    };
    const actual = info(initialState, action);
    const expected = action.payload;
    expect(actual).toEqual(expected);
  });
});
