/** @format */

import React from 'react';

import logo from './logo.svg';
import styles from './Logo.pcss';

const Logo = () => (
  <div className={styles.container}>
    <img
      src={logo}
      width="200"
      height="123"
      alt="Music Mashup"
      title="Music Mashup"
    />
  </div>
);

export default Logo;
