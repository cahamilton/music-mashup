import {
  INFO_UPDATE,
  infoUpdate,
} from '../info.actions';

describe('info.actions', () => {
  test('infoUpdate', () => {
    const payload = { name: 'Muse', mbid: 'fd857293-5ab8-40de-b29e-55a69d4e4d0f' };
    const action = infoUpdate(payload);
    expect(action).toEqual({ type: INFO_UPDATE, payload });
  });
});
