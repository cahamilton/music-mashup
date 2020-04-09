/** @format */

import React from 'react';

import styles from './Main.pcss';

import Alternative from '../Alternative/container/Alternative';
import ArtistBiography from '../ArtistBiography/container/ArtistBiography';
import ArtistHeader from '../ArtistHeader/container/ArtistHeader';
import ArtistVideos from '../ArtistVideos/container/ArtistVideos';
import ArtistImages from '../ArtistImages/container/ArtistImages';

const Main = () => (
  <main className={styles.container} role="main">
    <Alternative />
    <ArtistHeader />
    <ArtistBiography />
    <ArtistVideos />
    <ArtistImages />
  </main>
);

export default Main;
