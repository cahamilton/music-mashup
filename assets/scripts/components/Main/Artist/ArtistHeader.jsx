/** @format */

import React from 'react';
import PropTypes from 'prop-types';

import styles from './Artist.pcss';

const ArtistHeader = ({ name, genre }) => (
  <header className={styles.header}>
    <h1 className={styles.name}>{name}</h1>
    <h3 className={styles.genre}>{genre}</h3>
  </header>
);

ArtistHeader.propTypes = {
  name: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
};

export default ArtistHeader;
