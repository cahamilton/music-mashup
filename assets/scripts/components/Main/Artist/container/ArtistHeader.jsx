/** @format */

import { connect } from 'react-redux';

import Component from '../ArtistHeader';

const mapStateToProps = (state) => ({
  name: state.info.name,
  genre: state.info.genre,
});

const ArtistHeader = connect(mapStateToProps)(Component);

export default ArtistHeader;
