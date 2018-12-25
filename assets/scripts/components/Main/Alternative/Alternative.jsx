import React from 'react';
import PropTypes from 'prop-types';

import styles from './Alternative.pcss';

import AlternativeItem from './AlternativeItem';

const Alternative = (props) => {
  const {
    isVisible,
    matches,
    onClickItem,
  } = props;

  if (matches.length <= 1) {
    return null;
  }

  const listItems = matches.map((match) => {
    const {
      mbid,
      name,
      thumbnail,
    } = match;

    const normal = (thumbnail && thumbnail['1x']) ? thumbnail['1x'] : '';
    const retina = (thumbnail && thumbnail['2x']) ? thumbnail['2x'] : '';

    return (
      <li
        key={mbid}
        className={styles.item}
      >
        <AlternativeItem
          mbid={mbid}
          name={name}
          onClick={onClickItem}
          thumbnail={normal}
          thumbnailRetina={retina}
        />
      </li>
    );
  });

  return (
    <section
      className={styles.container}
      hidden={!isVisible}
    >
      <ol
        className={styles.list}
      >
        { listItems }
      </ol>
    </section>
  );
};

Alternative.propTypes = {
  isVisible: PropTypes.bool,
  matches: PropTypes.arrayOf(PropTypes.shape({
    mbid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    thumbnail: PropTypes.shape({
      '1x': PropTypes.string,
      '2x': PropTypes.string,
    }),
  })),
  onClickItem: PropTypes.func.isRequired,
};

Alternative.defaultProps = {
  isVisible: false,
  matches: [],
};

export default Alternative;
