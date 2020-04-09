/** @format */

import React from 'react';

import styles from './Header.pcss';

import Logo from '../Logo/Logo';
import Search from '../Search/Search';

const Header = () => (
  <header className={styles.header}>
    <Logo />
    <Search />
  </header>
);

export default Header;
