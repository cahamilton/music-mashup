/** @format */

import React from 'react';

import styles from './Main.pcss';

import Alternative from '../Alternative/container/Alternative';
import ArtistBiography from '../ArtistBiography/container/ArtistBiography';
import ArtistHeader from '../ArtistHeader/container/ArtistHeader';
import ArtistVideos from '../ArtistVideos/container/ArtistVideos';

const Main = () => (
  <main className={styles.container} role="main">
    <Alternative />
    <ArtistHeader />
    <ArtistBiography />
    <ArtistVideos />
  </main>
);

export default Main;
