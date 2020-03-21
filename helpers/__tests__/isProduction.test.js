/** @format */

/* eslint-disable global-require */

describe('isProduction', () => {
  const NODE_ENV_PREVIOUS = process.env.NODE_ENV;

  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    process.env.NODE_ENV = NODE_ENV_PREVIOUS;
  });

  it('should equal false', () => {
    process.env.NODE_ENV = 'development';
    const isProduction = require('../isProduction');
    expect(isProduction).toEqual(false);
  });

  it('should equal true', () => {
    process.env.NODE_ENV = 'production';
    const isProduction = require('../isProduction');
    expect(isProduction).toEqual(true);
  });
});
