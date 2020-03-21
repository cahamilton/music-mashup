/** @format */

const getFilteredResults = require('../getFilteredResults');

describe('getFilteredResults', () => {
  it('should return all artists sorted', () => {
    const artists = [
      { name: 'Muse', score: 99 },
      { name: 'Dangerous Muse', score: 96 },
      { name: 'Muse', score: 100 },
      { name: 'Dark Muse', score: 97 },
      { name: 'Blue Muse', score: 98 },
    ];
    const actual = getFilteredResults(artists);
    const expected = [
      { name: 'Muse', score: 100 },
      { name: 'Muse', score: 99 },
      { name: 'Blue Muse', score: 98 },
      { name: 'Dark Muse', score: 97 },
      { name: 'Dangerous Muse', score: 96 },
    ];
    expect(actual).toEqual(expected);
  });

  it('should return all artists sorted (with a score >= 50)', () => {
    const artists = [
      { name: 'Muse', score: 49 },
      { name: 'Dangerous Muse', score: 50 },
      { name: 'Muse', score: 100 },
      { name: 'Dark Muse', score: 97 },
      { name: 'Blue Muse', score: 21 },
    ];
    const actual = getFilteredResults(artists);
    const expected = [
      { name: 'Muse', score: 100 },
      { name: 'Dark Muse', score: 97 },
      { name: 'Dangerous Muse', score: 50 },
    ];
    expect(actual).toEqual(expected);
  });

  it('should return no artists', () => {
    const artists = [
      { name: 'Muse', score: 49 },
      { name: 'Dangerous Muse', score: 47 },
      { name: 'Muse', score: 45 },
      { name: 'Dark Muse', score: 48 },
      { name: 'Blue Muse', score: 46 },
    ];
    const actual = getFilteredResults(artists);
    const expected = [];
    expect(actual).toEqual(expected);
  });
});
