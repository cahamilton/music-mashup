import React, { Component, PropTypes } from 'react';

import styles from './Alternative.pcss';

import placeholder from './placeholder.svg';

class AlternativeItem extends Component {
  constructor(props) {
    super(props);
    this.generateImgSrc = this.generateImgSrc.bind(this);
    this.generateImgSrcSet = this.generateImgSrcSet.bind(this);
  }

  generateImgSrc() {
    return this.props.thumbnail !== ''
      ? this.props.thumbnail
      : placeholder;
  }

  generateImgSrcSet() {
    return this.props.thumbnail !== '' && this.props.thumbnailRetina !== ''
      ? `${this.props.thumbnail} 1x, ${this.props.thumbnailRetina} 2x`
      : '';
  }

  render() {
    return (
      <li className={styles.item}>
        <a className={styles.link}>
          <img
            width="32"
            height="32"
            src={this.generateImgSrc()}
            srcSet={this.generateImgSrcSet()}
            alt={this.props.name}
            title={this.props.name}
            className={styles.image}
          />
          <span className={styles.name}>{this.props.name}</span>
        </a>
      </li>
    );
  }
}

AlternativeItem.propTypes = {
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  thumbnailRetina: PropTypes.string.isRequired,
};

export default AlternativeItem;
