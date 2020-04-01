/** @format */

import deepFreeze from 'deep-freeze';

import info, { initialState } from '../info.reducers';
import { INFO_UPDATE } from '../../../actions/info/info.actions';
import { SEARCH_PENDING } from '../../../actions/search/search.actions';

describe('info.reducers', () => {
  const state = deepFreeze({
    ...initialState,
    name: 'Muse',
    mbid: 'fd857293-5ab8-40de-b29e-55a69d4e4d0f',
    genre: 'Alternative Rock',
  });

  it('should return default state', () => {
    const action = { type: SEARCH_PENDING };
    const actual = info(undefined, action);
    expect(actual).toEqual(initialState);
  });

  it('should return existing state', () => {
    const action = { type: SEARCH_PENDING };
    const actual = info(state, action);
    expect(actual).toEqual(state);
  });

  it('should return new state', () => {
    const action = {
      type: INFO_UPDATE,
      payload: {
        name: 'Foo Fighters',
        mbid: '67f66c07-6e61-4026-ade5-7e782fad3a5d',
        genre: 'Rock',
        relationYoutube: 'https://www.youtube.com/user/foofighters',
      },
    };
    const actual = info(state, action);
    const expected = {
      name: 'Foo Fighters',
      mbid: '67f66c07-6e61-4026-ade5-7e782fad3a5d',
      genre: 'Rock',
      relationWikidata: null,
      relationYoutube: 'https://www.youtube.com/user/foofighters',
    };
    expect(actual).toEqual(expected);
  });

  it('should not return items from previous state (no genre)', () => {
    const action = {
      type: INFO_UPDATE,
      payload: {
        name: 'Foo Fighters',
        mbid: '67f66c07-6e61-4026-ade5-7e782fad3a5d',
      },
    };
    const actual = info(state, action);
    const expected = {
      name: 'Foo Fighters',
      mbid: '67f66c07-6e61-4026-ade5-7e782fad3a5d',
      genre: null,
      relationWikidata: null,
      relationYoutube: null,
    };
    expect(actual).toEqual(expected);
  });
});
