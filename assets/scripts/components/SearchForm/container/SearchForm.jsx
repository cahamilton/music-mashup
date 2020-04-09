/** @format */

import { connect } from 'react-redux';
import { searchByArtistName } from '../../../actions/search/search.actions';

import Component from '../SearchForm';

const mapStateToProps = (state) => ({
  isLoading: state.search.loading,
});

const mapDispatchToProps = (dispatch) => ({
  onFormSubmit: (artist) => dispatch(searchByArtistName(artist)),
});

const Search = connect(mapStateToProps, mapDispatchToProps)(Component);

export default Search;
