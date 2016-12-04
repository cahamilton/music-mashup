import React, { Component, PropTypes } from 'react';

import styles from './Alternative.pcss';

class Alternative extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const matches = this.props.matches;
    const isVisible = this.props.isVisible;

    const listItems = matches.map((match, index) => {
      return (
        <li key={`${index}-${match.mbid}`} className={styles.item}>
          <a className={styles.link}>
            <img
              src={match.thumbnail['1x']}
              srcSet={`${match.thumbnail['1x']} 1x, ${match.thumbnail['2x']} 2x`}
              className={styles.image} width="32" height="32" alt={match.name}
              title={match.name}
            />
            <span className={styles.name}>{match.name}</span>
          </a>
        </li>
      );
    });

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
