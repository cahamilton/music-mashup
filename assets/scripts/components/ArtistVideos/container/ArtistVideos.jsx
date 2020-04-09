/** @format */

import { connect } from 'react-redux';

import Component from '../ArtistVideos';
import { videosSearch } from '../../../actions/videos/videos.actions';

const mapStateToProps = (state) => {
  const { relationYoutube } = state.info;
  const { loading, results } = state.videos;

  return {
    isLoading: loading,
    source: relationYoutube,
    videos: results.items,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onSourceUpdate: () => dispatch(videosSearch()),
});

const ArtistVideos = connect(mapStateToProps, mapDispatchToProps)(Component);

export default ArtistVideos;
