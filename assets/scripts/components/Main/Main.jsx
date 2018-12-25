import React from 'react';

import styles from './Main.pcss';

import Alternative from './Alternative/container/Alternative';

const Main = () => (
  <main className={styles.container} role="main">
    <Alternative />
  </main>
);

export default Main;
