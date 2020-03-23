/** @format */

import React from 'react';
import { shallow } from 'enzyme';

import Loading from '../Loading';

describe('Loading', () => {
  it('should not return null', () => {
    const wrapper = shallow(<Loading />);
    expect(wrapper.isEmptyRender()).toBe(false);
  });

  it('should append custom className', () => {
    const wrapper = shallow(<Loading />);
    expect(wrapper.find('.loading-super')).toHaveLength(0);
    wrapper.setProps({ className: 'loading-super' });
    expect(wrapper.find('.loading-super')).toHaveLength(1);
  });
});
