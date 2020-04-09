/** @format */

import React from 'react';
import { shallow, mount } from 'enzyme';

import ArtistImage from '../ArtistImage';
import ArtistImages from '../ArtistImages';
import Source from '../../Source/Source';

describe('ArtistImages', () => {
  const images = [
    {
      id: '1029384756',
      title: 'Image 1',
      thumbnail: {
        '1x': 'images.com/thumb-1-1.jpg',
        '2x': 'images.com/thumb-1-2.jpg',
      },
      url: 'images.com/image-1.jpg',
    },
    {
      id: '0192837465',
      title: 'Image 2',
      thumbnail: {
        '1x': 'images.com/thumb-2-1.jpg',
        '2x': 'images.com/thumb-2-2.jpg',
      },
      url: 'images.com/image-2.jpg',
    },
  ];
  const mbid = 'ef0d903f-edb3-45d9-a9d7-bf534b4be696';
  const onMbidUpdate = jest.fn();
  const source = 'images.com';

  const Component = <ArtistImages onMbidUpdate={onMbidUpdate} />;

  it('should return null', () => {
    const wrapper = shallow(Component);
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('should return null, using non-default props', () => {
    const wrapper = shallow(Component);
    wrapper.setProps({ isLoading: false, images: [] });
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('should render 2 instances of ArtistImage component', () => {
    const wrapper = shallow(Component);
    expect(wrapper.find(ArtistImage)).toHaveLength(0);
    wrapper.setProps({ images });
    expect(wrapper.find(ArtistImage)).toHaveLength(2);
  });

  it('should render instance of Source component', () => {
    const wrapper = shallow(Component);
    expect(wrapper.find(Source)).toHaveLength(0);
    wrapper.setProps({ images, source });
    expect(wrapper.find(Source)).toHaveLength(1);
  });

  it('should call onMbidUpdate when mbid updates', () => {
    const wrapper = mount(Component);
    wrapper.setProps({ images, source });
    jest.resetAllMocks();
    expect(onMbidUpdate).toHaveBeenCalledTimes(0);
    wrapper.setProps({ mbid });
    expect(onMbidUpdate).toHaveBeenCalledTimes(1);
  });
});
