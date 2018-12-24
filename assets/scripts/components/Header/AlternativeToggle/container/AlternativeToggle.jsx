import { connect } from 'react-redux';
import { searchResultsVisibleToggle } from '../../../../actions/search/search.actions';

import Component from '../AlternativeToggle';

const mapStateToProps = (state) => {
  const { matches } = state.search.results;

  return {
    isVisible: !!matches.length,
  };
};

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(searchResultsVisibleToggle()),
});

const AlternativeToggle = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

export default AlternativeToggle;
