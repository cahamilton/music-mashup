/** @format */

const cloneDeep = require('clone-deep');
const getFormattedResults = require('../getFormattedResults');
const response = require('../__mocks__/responses/responseWikipedia');

describe('getFormattedResults', () => {
  it('should format results correctly', () => {
    const actual = getFormattedResults(response);
    const expected = {
      extract: 'Suspendisse potenti. In metus magna.',
      image: 'test-image.jpg',
      source: 'https://en.wikipedia.org/wiki/Muse_(band)',
    };
    expect(expected).toEqual(actual);
  });

  it('should format results correctly (if no image)', () => {
    const results = cloneDeep(response);
    delete results.query.pages['178244'].thumbnail;

    const actual = getFormattedResults(results);
    const expected = {
      extract: 'Suspendisse potenti. In metus magna.',
      image: null,
      source: 'https://en.wikipedia.org/wiki/Muse_(band)',
    };
    expect(expected).toEqual(actual);
  });
});
