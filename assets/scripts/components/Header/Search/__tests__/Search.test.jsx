/** @format */

import React from 'react';
import { shallow } from 'enzyme';

import Search from '../Search';

describe('Search', () => {
  it('should not return null', () => {
    const wrapper = shallow(<Search />);
    expect(wrapper.isEmptyRender()).toBe(false);
  });
});
