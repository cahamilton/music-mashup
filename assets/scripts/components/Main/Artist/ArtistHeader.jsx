/** @format */

import React from 'react';
import PropTypes from 'prop-types';

import styles from './ArtistHeader.pcss';

const ArtistHeader = ({ name, genre }) => {
  if (!name) {
    return null;
  }

  return (
    <header className={styles.container}>
      <h1 className={styles.name}>{name}</h1>
      {genre && <h3 className={styles.genre}>{genre}</h3>}
    </header>
  );
};

ArtistHeader.propTypes = {
  name: PropTypes.string,
  genre: PropTypes.string,
};

ArtistHeader.defaultProps = {
  name: null,
  genre: null,
};

export default ArtistHeader;
