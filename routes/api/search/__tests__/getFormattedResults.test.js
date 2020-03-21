/** @format */

const getFormattedResults = require('../getFormattedResults');

describe('getFormattedResults', () => {
  it('should reformat MusicBrainz artists correctly', () => {
    const artists = [
      {
        'id': '9c9f1380-2516-4fc9-a3e6-f9f61941d090',
        'type': 'Group',
        'type-id': 'e431f5f6-b5d2-343d-8b36-72607fffb74b',
        'score': 100,
        'name': 'Muse',
        'sort-name': 'Muse',
        'country': 'GB',
        'area': {
          'id': '8a754a16-0027-3a29-b6d7-2b40ea0481ed',
          'type': 'Country',
          'type-id': '06dd0ae4-8c74-30bb-b43d-95dcedf961de',
          'name': 'United Kingdom',
          'sort-name': 'United Kingdom',
          'life-span': {
            ended: null,
          },
        },
        'begin-area': {
          'id': '2021b983-80b8-4f6b-a2a9-7d33c23e15b6',
          'type': 'Subdivision',
          'type-id': 'fd3d44c5-80a1-3842-9745-2c4972d35afa',
          'name': 'Devon',
          'sort-name': 'Devon',
          'life-span': {
            ended: null,
          },
        },
        'disambiguation': 'UK rock band',
        'life-span': {
          begin: '1994',
          ended: null,
        },
        'aliases': [
          {
            'sort-name': 'Muse',
            'type-id': '894afba6-2816-3c24-8072-eadb66bd04bc',
            'name': 'Muse',
            'locale': 'en',
            'type': 'Artist name',
            'primary': true,
            'begin-date': null,
            'end-date': null,
          },
          {
            'sort-name': 'ミューズ',
            'type-id': '894afba6-2816-3c24-8072-eadb66bd04bc',
            'name': 'ミューズ',
            'locale': 'ja',
            'type': 'Artist name',
            'primary': true,
            'begin-date': null,
            'end-date': null,
          },
        ],
      },
      {
        'id': 'ef0d903f-edb3-45d9-a9d7-bf534b4be696',
        'type': 'Group',
        'type-id': 'e431f5f6-b5d2-343d-8b36-72607fffb74b',
        'score': 86,
        'name': 'Muse',
        'sort-name': 'Muse',
        'begin-area': {
          'id': '2db42837-c832-3c27-b4a3-08198f75693c',
          'type': 'Country',
          'type-id': '06dd0ae4-8c74-30bb-b43d-95dcedf961de',
          'name': 'Japan',
          'sort-name': 'Japan',
          'life-span': {
            ended: null,
          },
        },
        'disambiguation': 'Japanese band; Music Unit Sound Effect',
        'life-span': {
          ended: null,
        },
      },
      {
        'id': 'fd857293-5ab8-40de-b29e-55a69d4e4d0f',
        'type': 'Group',
        'type-id': 'e431f5f6-b5d2-343d-8b36-72607fffb74b',
        'score': 86,
        'name': 'Muse',
        'sort-name': 'Muse',
        'country': 'FR',
        'area': {
          'id': '08310658-51eb-3801-80de-5a0739207115',
          'type': 'Country',
          'type-id': '06dd0ae4-8c74-30bb-b43d-95dcedf961de',
          'name': 'France',
          'sort-name': 'France',
          'life-span': {
            ended: null,
          },
        },
        'disambiguation': 'French ambient trance, key track "Innocent Voices"',
        'life-span': {
          ended: null,
        },
      },
    ];

    const expected = [
      {
        name: 'Muse',
        mbid: '9c9f1380-2516-4fc9-a3e6-f9f61941d090',
        disambiguation: 'UK rock band',
      },
      {
        name: 'Muse',
        mbid: 'ef0d903f-edb3-45d9-a9d7-bf534b4be696',
        disambiguation: 'Japanese band; Music Unit Sound Effect',
      },
      {
        name: 'Muse',
        mbid: 'fd857293-5ab8-40de-b29e-55a69d4e4d0f',
        disambiguation: 'French ambient trance, key track "Innocent Voices"',
      },
    ];

    const actual = getFormattedResults(artists);

    expect(actual).toEqual(expected);
  });
});
