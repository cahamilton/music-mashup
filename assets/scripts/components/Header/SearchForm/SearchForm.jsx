import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../Search/Search.pcss';

class SearchForm extends Component {

  static inputFocusHandler(event) {
    event.target.select();
  }

  constructor(props) {
    super(props);

    this.state = { query: '' };

    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.formSubmitHandler = this.formSubmitHandler.bind(this);
  }

  inputChangeHandler(event) {
    const {
      value: query,
    } = event.target;

    this.setState({ query });
  }

  formSubmitHandler(event) {
    const {
      query,
    } = this.state;

    const {
      onFormSubmit,
    } = this.props;

    event.preventDefault();

    onFormSubmit(query);
  }

  render() {
    const {
      isLoading,
    } = this.props;

    return (
      <form
        className={styles.form}
        onSubmit={this.formSubmitHandler}
      >
        <input
          autoComplete="off"
          className={styles.input}
          disabled={isLoading}
          onChange={this.inputChangeHandler}
          onFocus={SearchForm.inputFocusHandler}
          placeholder="Search for an Artist..."
          required
          type="text"
        />
        <button
          className={styles.button}
          disabled={isLoading}
          type="submit"
        >
          Go
        </button>
      </form>
    );
  }
}

SearchForm.propTypes = {
  isLoading: PropTypes.bool,
  onFormSubmit: PropTypes.func.isRequired,
};

SearchForm.defaultProps = {
  isLoading: false,
};

export default SearchForm;
