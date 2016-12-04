import React, { Component, PropTypes } from 'react';

import styles from './Main.pcss';

import Alternative from './Alternative/Alternative';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const matches = this.props.searchState.matches;

    if (matches.length > 0) {
      const artist = matches[0];
      const thumbnail = artist.thumbnail['1x'];
      const thumbnailRetina = artist.thumbnail['2x'];

      return (
        <main className={styles.container} role="main">
          <Alternative
            matches={matches.slice(1)}
            isVisible={this.props.alternativeState.isVisible}
          />
          <section className="artist-info">
            <header>
              <h1 className="artist-name">{artist.name}</h1>
            </header>
            <img
              src={thumbnail}
              srcSet={`${thumbnail} 1x, ${thumbnailRetina} 2x`}
              className="more-results__image" alt={artist.name} title={artist.name}
            />
            <p>{artist.mbid}</p>
          </section>
        </main>
      );
    }

    return null;
  }
}

Main.propTypes = {
  searchState: PropTypes.shape({
    query: PropTypes.string,
    matches: PropTypes.array,
  }),
  alternativeState: PropTypes.shape({
    isVisible: PropTypes.bool.isRequired,
  }),
};

export default Main;
