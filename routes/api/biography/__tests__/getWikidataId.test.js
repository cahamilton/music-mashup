/** @format */

const getWikidataId = require('../getWikidataId');

describe('getWikidataId', () => {
  it('should return null', () => {
    const url = 'https://google.com';
    const actual = getWikidataId(url);
    const expected = null;
    expect(actual).toEqual(expected);
  });

  it('should return Q22151', () => {
    const url = 'https://www.wikidata.org/wiki/Q22151';
    const actual = getWikidataId(url);
    const expected = 'Q22151';
    expect(actual).toEqual(expected);
  });
});
