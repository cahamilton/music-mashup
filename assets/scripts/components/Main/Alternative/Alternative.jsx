import React from 'react';
import PropTypes from 'prop-types';

import styles from './Alternative.pcss';

import AlternativeItem from './AlternativeItem';

const Alternative = (props) => {
  const matches = props.matches;
  const isVisible = props.isVisible;

  const listItems = matches.map((match) => {
    const key = `${match.name}-${match.mbid.substring(0, 8)}`.replace(/\s+/g, '-').toLowerCase();

    return (
      <AlternativeItem
        key={key}
        mbid={match.mbid}
        name={match.name}
        thumbnail={(match.thumbnail && match.thumbnail['1x']) ? match.thumbnail['1x'] : ''}
        thumbnailRetina={(match.thumbnail && match.thumbnail['2x']) ? match.thumbnail['2x'] : ''}
      />
    );
  });

  return (
    <section className={styles.container} hidden={!isVisible}>
      <ol className={styles.list}>
        { listItems }
      </ol>
    </section>
  );
};

Alternative.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  matches: PropTypes.arrayOf(PropTypes.shape({
    mbid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    thumbnail: PropTypes.shape({
      '1x': PropTypes.string,
      '2x': PropTypes.string,
    }),
  })),
};

export default Alternative;
