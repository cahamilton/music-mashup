import React, { Component, PropTypes } from 'react';

import styles from './Alternative.pcss';

import AlternativeItem from './AlternativeItem';

class Alternative extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const matches = this.props.matches;
    const isVisible = this.props.isVisible;

    const listItems = matches.map((match, index) =>
      <AlternativeItem
        key={`${index}-${match.mbid}`}
        mbid={match.mbid}
        name={match.name}
        thumbnail={(match.thumbnail && match.thumbnail['1x']) ? match.thumbnail['1x'] : ''}
        thumbnailRetina={(match.thumbnail && match.thumbnail['2x']) ? match.thumbnail['2x'] : ''}
      />,
    );

    return (
      <section className={styles.container} hidden={!isVisible}>
        <ol className={styles.list}>
          { listItems }
        </ol>
      </section>
    );
  }
}

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
