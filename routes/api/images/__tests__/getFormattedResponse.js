/** @format */

const getFormattedResponse = require('../getFormattedResponse');

describe('getFormattedResponse', () => {
  const data = {
    name: 'Muse',
    mbid_id: '9c9f1380-2516-4fc9-a3e6-f9f61941d090',
    artistbackground: [
      {
        id: '4096',
        url: 'https://assets.fanart.tv/fanart/music/image-4096.jpg',
        likes: '6',
      },
      {
        id: '12900',
        url: 'https://assets.fanart.tv/fanart/music/image-12900.jpg',
        likes: '3',
      },
      {
        id: '2317',
        url: 'https://assets.fanart.tv/fanart/music/image-2317.jpg',
        likes: '2',
      },
    ],
  };

  it('should format response data correctly', () => {
    const actual = getFormattedResponse(data);
    const expected = {
      source: `https://fanart.tv/artist/9c9f1380-2516-4fc9-a3e6-f9f61941d090`,
      items: [
        {
          id: '4096',
          title: 'Muse',
          url: 'https://assets.fanart.tv/fanart/music/image-4096.jpg',
          thumbnail: {
            '1x': 'https://assets.fanart.tv/preview/music/image-4096.jpg',
          },
        },
        {
          id: '12900',
          title: 'Muse',
          url: 'https://assets.fanart.tv/fanart/music/image-12900.jpg',
          thumbnail: {
            '1x': 'https://assets.fanart.tv/preview/music/image-12900.jpg',
          },
        },
        {
          id: '2317',
          title: 'Muse',
          url: 'https://assets.fanart.tv/fanart/music/image-2317.jpg',
          thumbnail: {
            '1x': 'https://assets.fanart.tv/preview/music/image-2317.jpg',
          },
        },
      ],
    };
    expect(actual).toEqual(expected);
  });
});
