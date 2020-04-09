/** @format */

import React from 'react';

import SearchForm from '../SearchForm/container/SearchForm';
import AlternativeToggle from '../AlternativeToggle/container/AlternativeToggle';

import styles from './Search.pcss';

const Search = () => (
  <div className={styles.container}>
    <SearchForm />
    <AlternativeToggle />
  </div>
);

export default Search;
