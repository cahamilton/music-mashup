/** @format */

import React from 'react';
import { shallow, mount } from 'enzyme';

import ArtistVideo from '../ArtistVideo';
import ArtistVideos from '../ArtistVideos';
import Source from '../../Source/Source';

describe('ArtistVideos', () => {
  const onSourceUpdate = jest.fn();
  const source = 'https://www.youtube.com/user/muse';
  const videos = [
    {
      id: 'nO4aXkR0ZY4',
      title: 'Origin of Muse: Origin of Symmetry Era [Out Now]',
      thumbnail: { '1x': 'mqdefault.jpg', '2x': 'sddefault.jpg' },
    },
    {
      id: 'KKHLLE6qXaw',
      title: 'Origin of Muse: Showbiz Era [Boxset Out Now]',
      thumbnail: { '1x': 'mqdefault.jpg', '2x': 'sddefault.jpg' },
    },
    {
      id: 'JiK90WrNuTQ',
      title: "Origin of Muse: 90's Era [Boxset Out Now]",
      thumbnail: { '1x': 'mqdefault.jpg', '2x': 'sddefault.jpg' },
    },
  ];

  const Component = <ArtistVideos onSourceUpdate={onSourceUpdate} />;

  it('should return null', () => {
    const wrapper = shallow(Component);
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('should return null, using non-default props', () => {
    const wrapper = shallow(Component);
    wrapper.setProps({ isLoading: false, videos: [] });
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('should render 3 instances of ArtistVideo component', () => {
    const wrapper = shallow(Component);
    expect(wrapper.find(ArtistVideo).length).toBe(0);
    wrapper.setProps({ videos });
    expect(wrapper.find(ArtistVideo).length).toBe(3);
  });

  it('should render instance of Source component', () => {
    const wrapper = shallow(Component);
    expect(wrapper.find(Source).length).toBe(0);
    wrapper.setProps({ source, videos });
    expect(wrapper.find(Source).length).toBe(1);
  });

  it('should call onSourceUpdate when source updates', () => {
    const wrapper = mount(Component);
    wrapper.setProps({ source, videos });
    jest.resetAllMocks();
    expect(onSourceUpdate).toHaveBeenCalledTimes(0);
    wrapper.setProps({ source: 'http://new-source.com' });
    expect(onSourceUpdate).toHaveBeenCalledTimes(1);
  });
});
