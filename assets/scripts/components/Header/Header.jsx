import React, { Component, PropTypes } from 'react';

import styles from './Header.pcss';

import Logo from './Logo/Logo';
import Search from './Search/Search';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className={styles.header}>
        <Logo />
        <Search
          searchState={this.props.searchState}
          alternativeState={this.props.alternativeState}
          updateParentState={this.props.updateParentState}
        />
      </header>
    );
  }
}

Header.propTypes = {
  searchState: PropTypes.shape({
    query: PropTypes.string,
    matches: PropTypes.array,
  }),
  alternativeState: PropTypes.shape({
    isVisible: PropTypes.bool.isRequired,
  }),
  updateParentState: PropTypes.func.isRequired,
};

export default Header;
