import { connect } from 'react-redux';
import { searchFetch } from '../../../../actions/search/search.actions';

import Component from '../SearchForm';

const mapStateToProps = state => ({
  isLoading: state.search.loading,
});

const mapDispatchToProps = dispatch => ({
  onFormSubmit: artist => dispatch(searchFetch(artist)),
});

const Search = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

export default Search;
