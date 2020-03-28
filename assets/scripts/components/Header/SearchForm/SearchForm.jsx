/** @format */

import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import styles from '../Search/Search.pcss';

const SearchForm = ({ isLoading, onFormSubmit }) => {
  const refInput = useRef(null);

  const inputFocusHandler = (event) => {
    event.target.select();
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    onFormSubmit(refInput.current.value);
  };

  return (
    <form className={styles.form} onSubmit={formSubmitHandler}>
      <input
        autoComplete="off"
        className={styles.input}
        disabled={isLoading}
        onFocus={inputFocusHandler}
        placeholder="Search for an Artist..."
        ref={refInput}
        required
        type="text"
      />
      <button className={styles.button} disabled={isLoading} type="submit">
        Go
      </button>
    </form>
  );
};

SearchForm.propTypes = {
  isLoading: PropTypes.bool,
  onFormSubmit: PropTypes.func.isRequired,
};

SearchForm.defaultProps = {
  isLoading: false,
};

export default SearchForm;
