import React, { Component, PropTypes } from 'react';

import 'whatwg-fetch';
import styles from './Search.pcss';

import AlternativeToggle from '../AlternativeToggle/AlternativeToggle';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = { query: '', loading: false };
    this.inputHandler = this.inputHandler.bind(this);
    this.formHandler = this.formHandler.bind(this);
  }

  inputHandler(event) {
    this.setState({ query: event.target.value });
  }

  formHandler(event) {
    event.preventDefault();
    this.setState({ loading: true });

    fetch(`/api/search/${encodeURIComponent(this.state.query)}`)
      .then((response) => {
        this.setState({ loading: false });
        return response.json();
      })
      .then((response) => {
        this.props.updateParentState({
          search: {
            query: this.state.query,
            matches: response.matches,
          },
        });
      })
      .catch((error) => {
        // TODO: Provide error message on front end
        return error;
      });
  }

  render() {
    return (
      <div className={styles.container}>
        <form onSubmit={this.formHandler} className={styles.form}>
          <input
            onChange={this.inputHandler}
            className={styles.input}
            type="text"
            placeholder="Search for an Artist..."
            autoComplete="off"
            autoFocus="true"
            required="true"
            value={this.state.query}
          />
          <button type="submit" className={styles.button}>Go</button>
        </form>
        <AlternativeToggle
          matches={this.props.searchState.matches.length}
          isVisible={this.props.alternativeState.isVisible}
          updateParentState={this.props.updateParentState}
        />
      </div>
    );
  }
}

Search.propTypes = {
  searchState: PropTypes.shape({
    query: PropTypes.string,
    matches: PropTypes.array,
  }),
  alternativeState: PropTypes.shape({
    isVisible: PropTypes.bool.isRequired,
  }),
  updateParentState: PropTypes.func.isRequired,
};

export default Search;
