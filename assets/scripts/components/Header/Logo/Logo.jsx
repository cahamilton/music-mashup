import React, { Component } from 'react';

import logo from './logo.svg';
import styles from './Logo.pcss';

class Logo extends Component {
  render() {
    return (
      <div className={styles.container}>
        <img src={logo} width="200" height="123" alt="Music Mashup" title="Music Mashup" />
      </div>
    );
  }
}

export default Logo;
