import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './AlternativeToggle.pcss';

class Alternative extends Component {
  constructor(props) {
    super(props);
    this.toggleAlternative = this.toggleAlternative.bind(this);
  }

  toggleAlternative() {
    this.props.updateParentState({
      alternative: {
        isVisible: this.props.isVisible !== true,
      },
    });
  }

  render() {
    if (this.props.matches > 1) {
      return (
        <div className={styles.container}>
          <small>
            <strong>Not what you were looking for? &nbsp;
              <button
                onClick={this.toggleAlternative}
                className={`link ${styles.button}`}
              >Did you mean...</button>
            </strong>
          </small>
        </div>
      );
    }

    return null;
  }
}

Alternative.propTypes = {
  matches: PropTypes.number.isRequired,
  isVisible: PropTypes.bool.isRequired,
  updateParentState: PropTypes.func.isRequired,
};

export default Alternative;
