/** @format */

import React from 'react';

import styles from './Main.pcss';

import Alternative from './Alternative/container/Alternative';
import ArtistHeader from './Artist/container/ArtistHeader';

const Main = () => (
  <main className={styles.container} role="main">
    <Alternative />
    <ArtistHeader />
  </main>
);

export default Main;
