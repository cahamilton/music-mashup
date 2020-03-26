/** @format */

const getYoutubeUserName = require('../getYouTubeUserName');

describe('getYoutubeUserName', () => {
  it('should return null', () => {
    const url = 'https://www.youtube.com/playlist?list=1q2w3e4r5t6y';
    const actual = getYoutubeUserName(url);
    expect(actual).toBeNull();
  });

  it('should return correct string', () => {
    const url = 'https://www.youtube.com/user/foofighters';
    const actual = getYoutubeUserName(url);
    expect(actual).toEqual('foofighters');
  });

  it('should return correct string, ignoring other url parameters', () => {
    const url = 'https://www.youtube.com/user/foofighters/playlists?view=1';
    const actual = getYoutubeUserName(url);
    expect(actual).toEqual('foofighters');
  });
});
