/** @format */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import ArtistImage from './ArtistImage';
import ContentBlock from '../ContentBlock/ContentBlock';
import Source from '../Source/Source';
import styles from './ArtistImages.pcss';

const ArtistImages = ({
  images, //
  isLoading,
  mbid,
  onMbidUpdate,
  source,
}) => {
  const hasImages = !!images.length;

  useEffect(() => {
    onMbidUpdate();
  }, [mbid, onMbidUpdate]);

  if (!isLoading && !hasImages) {
    return null;
  }

  return (
    <ContentBlock isLoading={isLoading} title="Images">
      <ul className={styles.list}>
        {images.map(({ id, thumbnail, title, url }) => (
          <ArtistImage key={id} thumbnail={thumbnail} title={title} url={url} />
        ))}
      </ul>

      {source && <Source href={source} />}
    </ContentBlock>
  );
};

ArtistImages.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      thumbnail: PropTypes.shape({
        '1x': PropTypes.string.isRequired,
        '2x': PropTypes.string,
      }).isRequired,
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ),
  isLoading: PropTypes.bool,
  mbid: PropTypes.string,
  onMbidUpdate: PropTypes.func.isRequired,
  source: PropTypes.string,
};

ArtistImages.defaultProps = {
  images: [],
  isLoading: false,
  mbid: null,
  source: null,
};

export default ArtistImages;
