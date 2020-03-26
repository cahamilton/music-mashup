/** @format */

const getFormattedResults = require('../getFormattedResults');

describe('getFormattedResults', () => {
  it('should reformat playlist items correctly', () => {
    const items = [
      {
        kind: 'youtube#playlistItem',
        etag: '"ksCrgYQhtFrXgbHAhi9Fo5t0C2I/OB7oMM-bM2Yp_NFWIQf9Y46RIjY"',
        id:
          'T0xBSzV1eV9uZ3g1SHFINVBOV1otQ0JqTGt2d3RWZjQ1OEFiN2pPcVkuNDkzNEY1RjIwODdCMTI3Rg==',
        snippet: {
          publishedAt: '2020-03-26T06:05:03.000Z',
          channelId: 'UCBR8-60-B28hp2BmDPdntcQ',
          title: 'Foo Fighters - The Pretender',
          description:
            'Watch the official music video for "The Pretender" by Foo Fighters\nListen to Foo Fighters: https://FooFighters.lnk.to/listen_YD\n\nSubscribe to the official Foo Fighters YouTube channel: https://FooFighters.lnk.to/subscribeYD\n\nWatch more Foo Fighter videos: https://FooFighters.lnk.to/listen_YC/youtube\n\nFollow Foo Fighters:\nFacebook: https://FooFighters.lnk.to/followFI\nInstagram: https://FooFighters.lnk.to/followII\nTwitter: https://FooFighters.lnk.to/followTI\nWebsite: https://FooFighters.lnk.to/followWI\nSpotify: https://FooFighters.lnk.to/followSI\nYouTube: https://FooFighters.lnk.to/subscribeYD\n\nLyrics:\nKeep you in the dark\nYou know they all pretend\nKeep you in the dark\nAnd so it all began\n\nSend in your skeletons\nSing as their bones go marching in... again\nThe need you buried deep\nThe secrets that you keep are ever ready\nAre you ready?\nI\'m finished making sense\nDone pleading ignorance\nThat whole defense\n\n#FooFighters #ThePretender #Remastered #OfficialMusicVideo',
          thumbnails: {
            default: {
              url: 'https://i.ytimg.com/vi/SBjQ9tuuTJQ/default.jpg',
              width: 120,
              height: 90,
            },
            medium: {
              url: 'https://i.ytimg.com/vi/SBjQ9tuuTJQ/mqdefault.jpg',
              width: 320,
              height: 180,
            },
            high: {
              url: 'https://i.ytimg.com/vi/SBjQ9tuuTJQ/hqdefault.jpg',
              width: 480,
              height: 360,
            },
            standard: {
              url: 'https://i.ytimg.com/vi/SBjQ9tuuTJQ/sddefault.jpg',
              width: 640,
              height: 480,
            },
            maxres: {
              url: 'https://i.ytimg.com/vi/SBjQ9tuuTJQ/maxresdefault.jpg',
              width: 1280,
              height: 720,
            },
          },
          channelTitle: 'YouTube',
          playlistId: 'OLAK5uy_ngx5HqH5PNWZ-CBjLkvwtVf458Ab7jOqY',
          position: 0,
          resourceId: {
            kind: 'youtube#video',
            videoId: 'SBjQ9tuuTJQ',
          },
        },
      },
      {
        kind: 'youtube#playlistItem',
        etag: '"ksCrgYQhtFrXgbHAhi9Fo5t0C2I/xA8hwa82tEfGfxjYB6icGp3KglI"',
        id:
          'T0xBSzV1eV9uZ3g1SHFINVBOV1otQ0JqTGt2d3RWZjQ1OEFiN2pPcVkuNTUwMkI0MENENzUyODAwMA==',
        snippet: {
          publishedAt: '2020-03-26T06:05:03.000Z',
          channelId: 'UCBR8-60-B28hp2BmDPdntcQ',
          title: 'Foo Fighters - Best Of You (Official Music Video)',
          description:
            "Watch the official music video for \"Best Of You\" by Foo Fighters\nListen to Foo Fighters: https://FooFighters.lnk.to/listen_YD\n\nSubscribe to the official Foo Fighters YouTube channel: https://FooFighters.lnk.to/subscribeYD\n\nWatch more Foo Fighter videos: https://FooFighters.lnk.to/listen_YC/youtube\n\nFollow Foo Fighters:\nFacebook: https://FooFighters.lnk.to/followFI\nInstagram: https://FooFighters.lnk.to/followII\nTwitter: https://FooFighters.lnk.to/followTI\nWebsite: https://FooFighters.lnk.to/followWI\nSpotify: https://FooFighters.lnk.to/followSI\nYouTube: https://FooFighters.lnk.to/subscribeYD\n\nLyrics:\nI've got another confession to make\nI'm your fool\nEveryone's got their chains to break\nHoldin' you\n\nWere you born to resist or be abused?\nIs someone getting the best, the best, the best, the best of you?\nIs someone getting the best, the best, the best, the best of you?\n\n#FooFighters #BestOfYou #Remastered #OfficialMusicVideo",
          thumbnails: {
            default: {
              url: 'https://i.ytimg.com/vi/h_L4Rixya64/default.jpg',
              width: 120,
              height: 90,
            },
            medium: {
              url: 'https://i.ytimg.com/vi/h_L4Rixya64/mqdefault.jpg',
              width: 320,
              height: 180,
            },
            high: {
              url: 'https://i.ytimg.com/vi/h_L4Rixya64/hqdefault.jpg',
              width: 480,
              height: 360,
            },
            standard: {
              url: 'https://i.ytimg.com/vi/h_L4Rixya64/sddefault.jpg',
              width: 640,
              height: 480,
            },
            maxres: {
              url: 'https://i.ytimg.com/vi/h_L4Rixya64/maxresdefault.jpg',
              width: 1280,
              height: 720,
            },
          },
          channelTitle: 'YouTube',
          playlistId: 'OLAK5uy_ngx5HqH5PNWZ-CBjLkvwtVf458Ab7jOqY',
          position: 1,
          resourceId: {
            kind: 'youtube#video',
            videoId: 'h_L4Rixya64',
          },
        },
      },
    ];
    const expected = [
      {
        id: 'SBjQ9tuuTJQ',
        title: 'Foo Fighters - The Pretender',
        thumbnail: {
          '1x': 'https://i.ytimg.com/vi/SBjQ9tuuTJQ/mqdefault.jpg',
          '2x': 'https://i.ytimg.com/vi/SBjQ9tuuTJQ/sddefault.jpg',
        },
      },
      {
        id: 'h_L4Rixya64',
        title: 'Foo Fighters - Best Of You (Official Music Video)',
        thumbnail: {
          '1x': 'https://i.ytimg.com/vi/h_L4Rixya64/mqdefault.jpg',
          '2x': 'https://i.ytimg.com/vi/h_L4Rixya64/sddefault.jpg',
        },
      },
    ];

    const actual = getFormattedResults(items);
    expect(actual).toEqual(expected);
  });
});
