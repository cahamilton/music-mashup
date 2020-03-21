/** @format */

const getArtistTopGenre = require('../getArtistTopGenre');

describe('getArtistTopGenre', () => {
  it('should return null if no available genres', () => {
    const genres = [];
    const actual = getArtistTopGenre(genres);
    const expected = null;
    expect(actual).toEqual(expected);
  });

  it('should return `Rock` as top genre', () => {
    const genres = [
      { name: 'alternative rock', count: 8 },
      { name: 'electronic', count: 0 },
      { name: 'funk rock', count: 1 },
      { name: 'metal', count: 1 },
      { name: 'pop rock', count: 1 },
      { name: 'progressive rock', count: 3 },
      { name: 'rock', count: 9 },
      { name: 'symphonic rock', count: 1 },
    ];
    const actual = getArtistTopGenre(genres);
    const expected = 'Rock';
    expect(actual).toEqual(expected);
  });
});
