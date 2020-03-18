/** @format */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Alternative.pcss';

import placeholder from './placeholder.svg';

class AlternativeItem extends Component {
  static generateImgSrc(thumbnail) {
    const hasSrc = thumbnail !== '';

    if (hasSrc) {
      return thumbnail;
    }

    return placeholder;
  }

  static generateImgSrcSet(thumbnail, thumbnailRetina) {
    const hasSrcSet = thumbnail !== '' && thumbnailRetina !== '';

    if (hasSrcSet) {
      return `${thumbnail} 1x, ${thumbnailRetina} 2x`;
    }

    return '';
  }

  render() {
    const { mbid, name, onClick, thumbnail, thumbnailRetina } = this.props;

    const src = AlternativeItem.generateImgSrc(thumbnail);

    const srcSet = AlternativeItem.generateImgSrcSet(
      thumbnail,
      thumbnailRetina,
    );

    return (
      <button
        className={styles.button}
        onClick={() => onClick(mbid)}
        type="button"
      >
        <img
          width="32"
          height="32"
          src={src}
          srcSet={srcSet}
          alt={name}
          title={name}
          className={styles.image}
        />
        <span className={styles.name}>{name}</span>
      </button>
    );
  }
}

AlternativeItem.propTypes = {
  mbid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  thumbnail: PropTypes.string.isRequired,
  thumbnailRetina: PropTypes.string.isRequired,
};

export default AlternativeItem;
