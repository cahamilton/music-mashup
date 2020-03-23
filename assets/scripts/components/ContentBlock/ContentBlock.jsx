/** @format */

import React from 'react';
import PropTypes from 'prop-types';

import styles from './ContentBlock.pcss';
import Loading from '../Loading/Loading';

const ContentBlock = ({ children, isLoading, title }) => (
  <section className={styles.container}>
    <header className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
    </header>
    <article className={styles.body}>
      {isLoading && <Loading />}
      {children}
    </article>
  </section>
);

ContentBlock.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

ContentBlock.defaultProps = {
  isLoading: false,
};

export default ContentBlock;
