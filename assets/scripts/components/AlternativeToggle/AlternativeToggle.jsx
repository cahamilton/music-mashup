/** @format */

import React from 'react';
import PropTypes from 'prop-types';

import styles from './AlternativeToggle.pcss';

const AlternativeToggle = (props) => {
  const { isVisible, onClick } = props;

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.container}>
      <small>
        <strong>
          {`Not what you were looking for? `}
          <button
            className={`link ${styles.button}`}
            onClick={onClick}
            type="button"
          >
            Did you mean...
          </button>
        </strong>
      </small>
    </div>
  );
};

AlternativeToggle.propTypes = {
  isVisible: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

AlternativeToggle.defaultProps = {
  isVisible: false,
};

export default AlternativeToggle;
