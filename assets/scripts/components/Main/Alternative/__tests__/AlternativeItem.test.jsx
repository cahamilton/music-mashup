/** @format */

import React from 'react';
import { shallow } from 'enzyme';

import AlternativeItem from '../AlternativeItem';

describe('AlternativeItem', () => {
  const disambiguation = 'UK rock band';
  const mbid = '9c9f1380-2516-4fc9-a3e6-f9f61941d090';
  const name = 'Muse';
  const onClick = jest.fn();
  const thumbnail = 'image-1x.jpg';
  const thumbnailRetina = 'image-2x.jpg';

  const Component = (
    <AlternativeItem
      mbid={mbid}
      name={name}
      onClick={onClick}
      thumbnail={thumbnail}
      thumbnailRetina={thumbnailRetina}
    />
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not return null', () => {
    const wrapper = shallow(Component);
    expect(wrapper.isEmptyRender()).toBe(false);
  });

  it('should call onClick, when clicking button', () => {
    const wrapper = shallow(Component);
    expect(onClick).toHaveBeenCalledTimes(0);
    wrapper.find('.button').simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should call onClick, with mbid', () => {
    const wrapper = shallow(Component);
    wrapper.find('.button').simulate('click');
    expect(onClick).toHaveBeenCalledWith(mbid);
  });

  it('should render disambiguation element', () => {
    const wrapper = shallow(Component);
    expect(wrapper.find('.disambiguation')).toHaveLength(0);
    wrapper.setProps({ disambiguation });
    expect(wrapper.find('.disambiguation')).toHaveLength(1);
  });
});
