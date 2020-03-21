/** @format */

const toTitleCase = require('../toTitleCase');

describe('toTitleCase', () => {
  it('should transform text to title case (single word)', () => {
    const text = 'hello';
    const expected = 'Hello';
    const actual = toTitleCase(text);
    expect(expected).toEqual(actual);
  });

  it('should transform text to title case (multiple words)', () => {
    const text = 'hello world';
    const expected = 'Hello World';
    const actual = toTitleCase(text);
    expect(expected).toEqual(actual);
  });

  it('should transform text to title case (multiple words, mixed cases)', () => {
    const text = 'hello World';
    const expected = 'Hello World';
    const actual = toTitleCase(text);
    expect(expected).toEqual(actual);
  });
});
