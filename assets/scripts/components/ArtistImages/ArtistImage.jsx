/** @format */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

import styles from './ArtistImage.pcss';

const ArtistImage = ({
  thumbnail, //
  title,
  url,
}) => {
  const { '1x': image, '2x': imageRetina } = thumbnail;

  const srcSet = imageRetina ? `${image} 1x, ${imageRetina} 2x` : null;

  return (
    <li className={styles.item}>
      <a
        className={styles.link}
        target="_blank"
        rel="noopener noreferrer"
        href={url}
        title={title}
      >
        <div className={styles.thumbnail}>
          <img
            alt={title}
            className={styles.image}
            src={image}
            srcSet={srcSet}
            title={title}
          />
        </div>
      </a>
    </li>
  );
};

ArtistImage.propTypes = {
  thumbnail: PropTypes.shape({
    '1x': PropTypes.string.isRequired,
    '2x': PropTypes.string,
  }).isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

const propsAreEqual = (prevProps, nextProps) => {
  return prevProps.url === nextProps.url;
};

export { propsAreEqual };

export default memo(ArtistImage, propsAreEqual);
