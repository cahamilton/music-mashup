/** @format */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

import styles from './ArtistVideo.pcss';

const ArtistVideo = ({ id, title, thumbnail }) => {
  const { '1x': image, '2x': imageRetina } = thumbnail;

  const href = `https://www.youtube.com/watch?v=${id}`;
  const srcSet = `${image} 1x, ${imageRetina} 2x`;

  return (
    <li className={styles.item}>
      <a
        className={styles.link}
        target="_blank"
        rel="noopener noreferrer"
        href={href}
        title={title}
      >
        <div className={styles.thumbnail}>
          <img
            alt={title}
            title={title}
            src={image}
            srcSet={srcSet}
            className={styles.image}
          />
        </div>
        <span className={styles.title}>
          <div>{title}</div>
        </span>
      </a>
    </li>
  );
};

ArtistVideo.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.shape({
    '1x': PropTypes.string.isRequired,
    '2x': PropTypes.string.isRequired,
  }).isRequired,
};

const propsAreEqual = (prevProps, nextProps) => {
  return prevProps.id === nextProps.id;
};

export { propsAreEqual };

export default memo(ArtistVideo, propsAreEqual);
