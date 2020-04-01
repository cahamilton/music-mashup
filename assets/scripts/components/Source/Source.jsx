/** @format */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

import styles from './Source.pcss';

const Source = ({ href }) => (
  <small className={styles.text}>
    {`Source: `}
    <a href={href} target="_blank" rel="noopener noreferrer">
      {href}
    </a>
  </small>
);

Source.propTypes = {
  href: PropTypes.string.isRequired,
};

export default memo(Source);
