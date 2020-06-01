/** @format */

import deepFreeze from 'deep-freeze';
import info, { initialState } from '../info.reducers';
import { DEFAULT } from '../../../actions/actions';
import { INFO_UPDATE } from '../../../actions/info/info.actions';
import type { StateInfo } from '../info.reducers';
import type { ActionDefault } from '../../../actions/actions';
import type { ActionInfoUpdate } from '../../../actions/info/info.actions';

describe('info.reducers', () => {
  const state: StateInfo = {
    name: 'Muse',
    mbid: '9c9f1380-2516-4fc9-a3e6-f9f61941d090',
    genre: 'Rock',
    relationWikidata: 'https://www.wikidata.org/wiki/Q22151',
    relationYoutube: 'https://www.youtube.com/user/muse',
  };

  deepFreeze(state);

  it('should return default state', () => {
    const action: ActionDefault = { type: DEFAULT };
    const actual = info(undefined, action);
    expect(actual).toEqual(initialState);
  });

  it('should return existing state', () => {
    const action: ActionDefault = { type: DEFAULT };
    const actual = info(state, action);
    expect(actual).toEqual(state);
  });

  it('should return new state', () => {
    const action: ActionInfoUpdate = {
      type: INFO_UPDATE,
      payload: {
        name: 'Foo Fighters',
        mbid: '67f66c07-6e61-4026-ade5-7e782fad3a5d',
        genre: 'Rock',
        relationYoutube: 'https://www.youtube.com/user/foofighters',
      },
    };
    const actual = info(state, action);
    expect(actual).toEqual(action.payload);
  });

  it('should not return items from previous state (no genre)', () => {
    const action: ActionInfoUpdate = {
      type: INFO_UPDATE,
      payload: {
        name: 'Foo Fighters',
        mbid: '67f66c07-6e61-4026-ade5-7e782fad3a5d',
      },
    };
    const actual = info(state, action);
    expect(actual).toEqual(action.payload);
  });
});
