/** @format */

import { connect } from 'react-redux';

import Component from '../ArtistBiography';

const mapStateToProps = (state) => {
  const { biography, info } = state;

  return {
    extract: biography.content.extract,
    image: biography.content.image,
    isLoading: biography.loading,
    name: info.name,
    source: biography.content.source,
  };
};

const ArtistBiography = connect(mapStateToProps)(Component);

export default ArtistBiography;
