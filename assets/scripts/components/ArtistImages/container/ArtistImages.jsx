/** @format */

import { connect } from 'react-redux';

import Component from '../ArtistImages';
import { imagesSearch } from '../../../actions/images/images.actions';

const mapStateToProps = ({ images, info }) => {
  const { mbid } = info;
  const { loading, results } = images;

  return {
    images: results.items,
    isLoading: loading,
    mbid,
    source: results.source,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onMbidUpdate: () => dispatch(imagesSearch()),
});

const ArtistImages = connect(mapStateToProps, mapDispatchToProps)(Component);

export default ArtistImages;
