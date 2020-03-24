/** @format */

import React from 'react';
import PropTypes from 'prop-types';

import styles from './ArtistBiography.pcss';
import ContentBlock from '../../ContentBlock/ContentBlock';

const ArtistBiography = ({ extract, image, isLoading, name, source }) => {
  if (!source && !isLoading) {
    return null;
  }

  const renderImage = () => {
    return (
      <figure className={styles.image}>
        <img src={image} alt={name} title={name} />
      </figure>
    );
  };

  const renderExtract = () => {
    return <p className={styles.extract}>{extract}</p>;
  };

  const renderSource = () => {
    return (
      <small className={styles.source}>
        {`Source: `}
        <a href={source} target="_blank" rel="noopener noreferrer">
          {source}
        </a>
      </small>
    );
  };

  return (
    <ContentBlock isLoading={isLoading} title="Biography">
      {image && renderImage()}
      {extract && renderExtract()}
      {source && renderSource()}
    </ContentBlock>
  );
};

ArtistBiography.propTypes = {
  extract: PropTypes.string,
  image: PropTypes.string,
  isLoading: PropTypes.bool,
  name: PropTypes.string,
  source: PropTypes.string,
};

ArtistBiography.defaultProps = {
  extract: null,
  image: null,
  isLoading: false,
  name: null,
  source: null,
};

export default ArtistBiography;
