import React, { Component } from 'react';

import styles from './Header.pcss';

import Logo from './Logo/Logo';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className={styles.header}>
        <Logo />
      </header>
    );
  }
}

export default Header;
