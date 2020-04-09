/** @format */

import React from 'react';
import { shallow } from 'enzyme';

import Alternative from '../Alternative';
import AlternativeItem from '../AlternativeItem';

describe('Alternative', () => {
  const onClick = jest.fn();
  const matches = [
    {
      name: 'Muse',
      mbid: 'ef0d903f-edb3-45d9-a9d7-bf534b4be696',
      disambiguation: 'Japanese band; Music Unit Sound Effect',
      thumbnail: { '1x': 'image-1x.jpg', '2x': 'image-2x.jpg' },
    },
    {
      name: 'Lewis "Rabbit" Muse',
      mbid: '6ce595fe-ffe8-4301-9d65-6af04aa266e3',
      thumbnail: { '1x': 'image-1x.jpg', '2x': 'image-2x.jpg' },
    },
    {
      name: 'Dangerous Muse',
      mbid: 'b06d1938-f4fd-4c68-bfce-13410b812706',
      thumbnail: { '1x': 'image-1x.jpg', '2x': 'image-2x.jpg' },
    },
  ];

  const Component = <Alternative onClickItem={onClick} />;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return null if no matches', () => {
    const wrapper = shallow(Component);
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('should return 3 instances of AlternativeItem', () => {
    const wrapper = shallow(Component);
    expect(wrapper.find(AlternativeItem)).toHaveLength(0);
    wrapper.setProps({ matches });
    expect(wrapper.find(AlternativeItem)).toHaveLength(3);
  });

  it('should be hidden by default', () => {
    const wrapper = shallow(Component).setProps({ matches });
    expect(wrapper.find('.container').prop('hidden')).toEqual(true);
  });

  it('should not be hidden is isVisible = true', () => {
    const wrapper = shallow(Component).setProps({ matches, isVisible: true });
    expect(wrapper.find('.container').prop('hidden')).toEqual(false);
  });
});
