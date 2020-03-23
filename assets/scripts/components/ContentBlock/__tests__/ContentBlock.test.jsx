/** @format */

import React from 'react';
import { shallow } from 'enzyme';

import ContentBlock from '../ContentBlock';
import Loading from '../../Loading/Loading';

describe('ContentBlock', () => {
  it('should not return null', () => {
    const wrapper = shallow(
      <ContentBlock title="Test">
        <p>Lorem ipsum, la-dee-da.</p>
      </ContentBlock>,
    );
    expect(wrapper.isEmptyRender()).toBe(false);
  });

  it('should render title correctly', () => {
    const wrapper = shallow(
      <ContentBlock title="Test">
        <p>Lorem ipsum, la-dee-da.</p>
      </ContentBlock>,
    );
    expect(wrapper.find('.title')).toHaveLength(1);
    expect(wrapper.find('.title').text()).toEqual('Test');
  });

  it('should render children correctly', () => {
    const wrapper = shallow(
      <ContentBlock title="Test">
        <p className="child-1">Lorem ipsum, la-dee-da.</p>
        <p className="child-2">Lorem ipsum, do-re-me.</p>
      </ContentBlock>,
    );
    expect(wrapper.find('.child-1')).toHaveLength(1);
    expect(wrapper.find('.child-2')).toHaveLength(1);
    expect(wrapper.children()).toHaveLength(2);
  });

  it('should render Loading component', () => {
    const wrapper = shallow(
      <ContentBlock title="Test">
        <p>Lorem ipsum, la-dee-da.</p>
      </ContentBlock>,
    );
    expect(wrapper.find(Loading)).toHaveLength(0);
    wrapper.setProps({ isLoading: true });
    expect(wrapper.find(Loading)).toHaveLength(1);
  });
});
