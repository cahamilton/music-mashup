/** @format */

import { INFO_UPDATE, infoUpdate } from '../info.actions';
import type { ActionInfoUpdate } from '../info.actions';
import type { StateInfo } from '../../../reducers/info/info.reducers';

describe('info.actions', () => {
  test('infoUpdate', () => {
    const payload: StateInfo = {
      name: 'Muse',
      mbid: 'fd857293-5ab8-40de-b29e-55a69d4e4d0f',
    };
    const expected: ActionInfoUpdate = {
      type: INFO_UPDATE,
      payload,
    };
    const action = infoUpdate(payload);
    expect(action).toEqual(expected);
  });
});
