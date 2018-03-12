import React from 'react';

import styles from './Header.pcss';

import Logo from './Logo/Logo';

const Header = () => (
  <header className={styles.header}>
    <Logo />
  </header>
);

export default Header;
