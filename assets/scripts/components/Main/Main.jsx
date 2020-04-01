/** @format */

import React from 'react';

import styles from './Main.pcss';

import Alternative from './Alternative/container/Alternative';
import ArtistBiography from './Artist/container/ArtistBiography';
import ArtistHeader from './Artist/container/ArtistHeader';
import ArtistVideos from './Artist/container/ArtistVideos';

const Main = () => (
  <main className={styles.container} role="main">
    <Alternative />
    <ArtistHeader />
    <ArtistBiography />
    <ArtistVideos />
  </main>
);

export default Main;
