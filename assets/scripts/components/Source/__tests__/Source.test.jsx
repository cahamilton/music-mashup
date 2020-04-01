/** @format */

import React from 'react';
import { shallow } from 'enzyme';

import Source from '../Source';

describe('Source', () => {
  const href = 'https://www.youtube.com/user/muse';

  it('should not return null', () => {
    const wrapper = shallow(<Source href={href} />);
    expect(wrapper.isEmptyRender()).toBe(false);
  });

  it('should include source as visible text', () => {
    const wrapper = shallow(<Source href={href} />);
    expect(wrapper.find('.text').text()).toContain(href);
  });

  it('should include anchor which links to source', () => {
    const wrapper = shallow(<Source href={href} />);
    expect(wrapper.find('a').prop('href')).toBe(href);
  });

  it('should open source in new window', () => {
    const wrapper = shallow(<Source href={href} />);
    expect(wrapper.find('a').prop('target')).toBe('_blank');
    expect(wrapper.find('a').prop('rel')).toContain('noopener');
    expect(wrapper.find('a').prop('rel')).toContain('noreferrer');
  });
});
