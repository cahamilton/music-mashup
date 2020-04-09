/** @format */

import React from 'react';
import { shallow } from 'enzyme';

import ArtistImage, { propsAreEqual } from '../ArtistImage';

describe('ArtistImage', () => {
  const thumbnail = { '1x': 'https://images.com/1029384756/thumb-1x.jpg' };
  const title = 'Image Title';
  const url = 'https://images.com/1029384756/full.jpg';

  it('should not return null', () => {
    const wrapper = shallow(
      <ArtistImage thumbnail={thumbnail} title={title} url={url} />,
    );
    expect(wrapper.isEmptyRender()).toBe(false);
  });

  it('should have a link, with correct href', () => {
    const wrapper = shallow(
      <ArtistImage thumbnail={thumbnail} title={title} url={url} />,
    );
    const element = wrapper.find('a');
    expect(element).toHaveLength(1);
    expect(element.prop('href')).toBe(url);
  });

  it('should have an image, with correct alt and title attribute', () => {
    const wrapper = shallow(
      <ArtistImage thumbnail={thumbnail} title={title} url={url} />,
    );
    const element = wrapper.find('img');
    expect(element).toHaveLength(1);
    expect(element.prop('alt')).toBe(title);
    expect(element.prop('title')).toBe(title);
  });

  it('should have an image, with correct src', () => {
    const wrapper = shallow(
      <ArtistImage thumbnail={thumbnail} title={title} url={url} />,
    );
    const element = wrapper.find('img');
    expect(element).toHaveLength(1);
    expect(element.prop('src')).toBe(thumbnail['1x']);
    expect(element.prop('srcSet')).toBeNull();
  });

  it('should have an image, with correct src and srcSet', () => {
    const image = {
      ...thumbnail,
      '2x': 'https://images.com/1029384756/thumb-2x.jpg',
    };
    const wrapper = shallow(
      <ArtistImage thumbnail={image} title={title} url={url} />,
    );

    const element = wrapper.find('img');
    expect(element).toHaveLength(1);
    expect(element.prop('src')).toBe(image['1x']);
    expect(element.prop('srcSet')).toBe(`${image['1x']} 1x, ${image['2x']} 2x`);
  });

  it('should return true, to not trigger a rerender', () => {
    const prevProps = { thumbnail, title, url };
    const nextProps = { thumbnail, title, url };
    const actual = propsAreEqual(prevProps, nextProps);
    expect(actual).toBe(true);
  });

  it('should return false, to trigger a rerender', () => {
    const prevProps = { thumbnail, title, url };
    const nextProps = {
      thumbnail,
      title,
      url: 'https://images.com/0192873645/full.jpg',
    };
    const actual = propsAreEqual(prevProps, nextProps);
    expect(actual).toBe(false);
  });
});
