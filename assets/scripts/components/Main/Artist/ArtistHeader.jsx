import React from 'react';
import PropTypes from 'prop-types';

import styles from './Artist.pcss';

function ArtistHeader(props) {
  return (
    <header className={styles.header}>
      <h1 className={styles.name}>{props.name}</h1>
      <h3 className={styles.genre}>{props.genre}</h3>
    </header>
  );
}

ArtistHeader.propTypes = {
  name: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
};

export default ArtistHeader;
