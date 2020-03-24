/** @format */

import React from 'react';
import PropTypes from 'prop-types';

import getImageSrc from './getImageSrc';
import getImageSrcSet from './getImageSrcSet';
import styles from './AlternativeItem.pcss';

const AlternativeItem = ({
  disambiguation,
  mbid,
  name,
  onClick,
  thumbnail,
  thumbnailRetina,
}) => (
  <button className={styles.button} onClick={() => onClick(mbid)} type="button">
    <div className={styles.image}>
      <img
        width="32"
        height="32"
        src={getImageSrc(thumbnail)}
        srcSet={getImageSrcSet(thumbnail, thumbnailRetina)}
        alt={name}
        title={name}
      />
    </div>
    <div className={styles.info}>
      <span className={styles.name}>{name}</span>
      {disambiguation && (
        <small className={styles.disambiguation}>{disambiguation}</small>
      )}
    </div>
  </button>
);

AlternativeItem.propTypes = {
  disambiguation: PropTypes.string,
  mbid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  thumbnail: PropTypes.string.isRequired,
  thumbnailRetina: PropTypes.string.isRequired,
};

AlternativeItem.defaultProps = {
  disambiguation: null,
};

export default AlternativeItem;
