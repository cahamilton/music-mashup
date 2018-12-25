import { connect } from 'react-redux';

import Component from '../Alternative';

import {
  searchResultsVisibleToggle,
  searchByArtistMbid,
} from '../../../../actions/search/search.actions';


const mapStateToProps = state => ({
  matches: state.search.results.matches,
  isVisible: state.search.results.visible,
});

const mapDispatchToProps = dispatch => ({
  onClickItem: (mbid) => {
    dispatch(searchResultsVisibleToggle());
    dispatch(searchByArtistMbid(mbid));
  },
});

const Alternative = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

export default Alternative;
