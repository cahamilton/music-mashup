const search = require('../search');
const mock = require('../__mocks__/search.mock.js');

describe('API', () => {
  describe('search.artist', () => {
    describe('successHandler', () => {
      const results = search.artist.successHandler(mock.success);

      it('should return an Object which has a `query` and `matches` property keys', () => {
        expect(results).toEqual(expect.objectContaining({
          query: expect.any(String),
          matches: expect.any(Array),
        }));
      });

      it('should return no matches with an empty `mbid` property', () => {
        results.matches.forEach((result) => {
          expect(result.mbid).toEqual(expect.any(String));
        });
      });
    });

    describe('errorHandler', () => {
      const results = search.artist.errorHandler(mock.error);

      it('should return an Object with an error message', () => {
        expect(results).toEqual(expect.objectContaining({
          error: 'Invalid Method - No method with that name in this package',
        }));
      });
    });

    describe('formatData', () => {
      const matches = mock.success.results.artistmatches;

      it('should return an Object with a `mbid` and `name` property key', () => {
        const match = search.artist.formatData(matches.artist[0]);

        expect(match).toEqual(expect.objectContaining({
          name: 'The Offspring',
          mbid: '23a03e33-a603-404e-bcbf-2c00159d7067',
        }));
      });

      it('should return `thumbnail` object if images exists', () => {
        const match = search.artist.formatData(matches.artist[0]);

        expect(match).toEqual(expect.objectContaining({
          name: 'The Offspring',
          thumbnail: {
            '1x': 'http://img2-ak.lst.fm/i/u/34s/58e8399fa68842fea5f8e59348a0727a.png',
            '2x': 'http://img2-ak.lst.fm/i/u/64s/58e8399fa68842fea5f8e59348a0727a.png',
          },
        }));
      });

      it('should not return `thumbnail` object if images dont exist', () => {
        const match = search.artist.formatData(matches.artist[6]);

        expect(match).toEqual(expect.objectContaining({
          name: 'Celtic Offspring',
          mbid: '985dcdd3-3968-42c2-9057-97b1413ef824',
        }));
        expect(match).not.toEqual(expect.objectContaining({
          thumbnail: expect.anything() || undefined,
        }));
      });

      it('should not return a `2x` key if image does not exists', () => {
        const match = search.artist.formatData(matches.artist[8]);

        expect(match).toEqual(expect.objectContaining({
          name: 'Final Offspring',
          mbid: '85f00af5-0779-8376-c3ed-2c9f02d41f96',
        }));
        expect(match.thumbnail).not.toEqual(expect.objectContaining({
          '2x': expect.anything(),
        }));
      });
    });
  });
});
