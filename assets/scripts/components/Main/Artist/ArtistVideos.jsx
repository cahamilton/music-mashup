/** @format */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import ArtistVideo from './ArtistVideo';
import ContentBlock from '../../ContentBlock/ContentBlock';
import Source from '../../Source/Source';
import styles from './ArtistVideos.pcss';

const ArtistVideos = ({
  isLoading, //
  onSourceUpdate,
  source,
  videos,
}) => {
  const hasVideos = !!videos.length;

  useEffect(() => {
    onSourceUpdate();
  }, [onSourceUpdate, source]);

  if (!isLoading && !hasVideos) {
    return null;
  }

  return (
    <ContentBlock isLoading={isLoading} title="Videos">
      <ul className={styles.list}>
        {videos.map(({ id, title, thumbnail }) => (
          <ArtistVideo key={id} id={id} title={title} thumbnail={thumbnail} />
        ))}
      </ul>

      {hasVideos && source && <Source href={source} />}
    </ContentBlock>
  );
};

ArtistVideos.propTypes = {
  isLoading: PropTypes.bool,
  onSourceUpdate: PropTypes.func.isRequired,
  source: PropTypes.string,
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      thumbnail: PropTypes.shape({
        '1x': PropTypes.string.isRequired,
        '2x': PropTypes.string.isRequired,
      }).isRequired,
    }),
  ),
};

ArtistVideos.defaultProps = {
  isLoading: false,
  source: null,
  videos: [],
};

export default ArtistVideos;
