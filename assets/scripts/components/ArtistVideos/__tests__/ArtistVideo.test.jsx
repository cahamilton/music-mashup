/** @format */

import React from 'react';
import { shallow } from 'enzyme';

import ArtistVideo, { propsAreEqual } from '../ArtistVideo';

describe('ArtistVideo', () => {
  const id = '8RxveDMwgSE';
  const title = 'MUSE - Algorithm';
  const thumbnail = {
    '1x': 'mqdefault.jpg',
    '2x': 'sddefault.jpg',
  };

  const Component = <ArtistVideo id={id} title={title} thumbnail={thumbnail} />;

  it('should not return null', () => {
    const wrapper = shallow(Component);
    expect(wrapper.isEmptyRender()).toBe(false);
  });

  it('should have a link, with correct href ', () => {
    const wrapper = shallow(Component);
    const element = wrapper.find('a');
    const href = 'https://www.youtube.com/watch?v=8RxveDMwgSE';
    expect(element.length).toBe(1);
    expect(element.prop('href')).toBe(href);
  });

  it('should have an image, with correct src and srcSet', () => {
    const wrapper = shallow(Component);
    const element = wrapper.find('.image');
    const src = 'mqdefault.jpg';
    const srcSet = 'mqdefault.jpg 1x, sddefault.jpg 2x';
    expect(element.length).toBe(1);
    expect(element.prop('src')).toBe(src);
    expect(element.prop('srcSet')).toBe(srcSet);
  });

  it('should have a title element', () => {
    const wrapper = shallow(Component);
    const element = wrapper.find('.title');
    expect(element.length).toBe(1);
    expect(element.text()).toBe(title);
  });

  it('should return true, to not trigger a rerender', () => {
    const prevProps = { id, title, thumbnail };
    const nextProps = { id, title, thumbnail };
    const actual = propsAreEqual(prevProps, nextProps);
    expect(actual).toBe(true);
  });

  it('should return false, to trigger a rerender', () => {
    const prevProps = { id, title, thumbnail };
    const nextProps = { id: 'ESgwMDevxR8', title, thumbnail };
    const actual = propsAreEqual(prevProps, nextProps);
    expect(actual).toBe(false);
  });
});
