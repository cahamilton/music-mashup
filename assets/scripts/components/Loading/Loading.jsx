/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Loading.pcss';

const Loading = ({ className }) => {
  const classNameContainer = classNames(styles.container, className);

  return (
    <div className={classNameContainer}>
      <div className={styles.icon}>
        <div className={styles.bars}>
          <div className={styles.column}>
            <div className={styles.bar11} />
            <div className={styles.bar12} />
          </div>
          <div className={styles.column}>
            <div className={styles.bar21} />
            <div className={styles.bar22} />
          </div>
          <div className={styles.column}>
            <div className={styles.bar31} />
            <div className={styles.bar32} />
          </div>
          <div className={styles.column}>
            <div className={styles.bar41} />
            <div className={styles.bar42} />
          </div>
        </div>
      </div>
    </div>
  );
};

Loading.propTypes = {
  className: PropTypes.string,
};

Loading.defaultProps = {
  className: null,
};

export default Loading;
