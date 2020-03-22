/** @format */

const getArtistRelation = require('../getArtistRelation');

describe('getArtistRelation', () => {
  const mbArtist = {
    name: 'Muse',
    id: '9c9f1380-2516-4fc9-a3e6-f9f61941d090',
    disambiguation: 'UK rock band',
    relations: [
      {
        'attribute-ids': {},
        'ended': false,
        'attribute-values': {},
        'begin': null,
        'direction': 'forward',
        'attributes': [],
        'target-credit': '',
        'type-id': '08db8098-c0df-4b78-82c3-c8697b4bba7f',
        'url': {
          id: '83f3791b-66a9-4a09-b3ea-aa60fb9c6d9b',
          resource: 'https://www.last.fm/music/Muse',
        },
        'end': null,
        'type': 'last.fm',
        'source-credit': '',
        'target-type': 'url',
      },
      {
        'begin': null,
        'attribute-values': {},
        'attribute-ids': {},
        'ended': false,
        'url': {
          id: '2bee5e7c-a915-440e-b28d-7e34a7ec9adb',
          resource: 'https://www.wikidata.org/wiki/Q22151',
        },
        'type-id': '689870a4-a1e4-4912-b17f-7b2664215698',
        'target-credit': '',
        'attributes': [],
        'direction': 'forward',
        'source-credit': '',
        'type': 'wikidata',
        'target-type': 'url',
        'end': null,
      },
      {
        'type': 'youtube',
        'source-credit': '',
        'target-type': 'url',
        'end': null,
        'type-id': '6a540e5b-58c6-4192-b6ba-dbc71ec8fcf0',
        'target-credit': '',
        'url': {
          id: '95abb809-715b-4806-b756-b4fa2ca2376f',
          resource: 'https://www.youtube.com/user/muse',
        },
        'direction': 'forward',
        'attributes': [],
        'attribute-values': {},
        'attribute-ids': {},
        'ended': false,
        'begin': null,
      },
    ],
  };

  it('should return null', () => {
    const type = 'myspace';
    const actual = getArtistRelation(mbArtist, type);
    const expected = null;
    expect(actual).toEqual(expected);
  });

  it('should return youtube URL', () => {
    const type = 'youtube';
    const actual = getArtistRelation(mbArtist, type);
    const expected = 'https://www.youtube.com/user/muse';
    expect(actual).toEqual(expected);
  });

  it('should return wikidata URL', () => {
    const type = 'wikidata';
    const actual = getArtistRelation(mbArtist, type);
    const expected = 'https://www.wikidata.org/wiki/Q22151';
    expect(actual).toEqual(expected);
  });
});
