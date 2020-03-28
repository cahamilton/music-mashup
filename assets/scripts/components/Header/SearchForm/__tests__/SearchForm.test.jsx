/** @format */

import React from 'react';
import { shallow, mount } from 'enzyme';

import SearchForm from '../SearchForm';

describe('SearchForm', () => {
  const onFormSubmit = jest.fn();
  const Component = <SearchForm onFormSubmit={onFormSubmit} />;

  it('should toggle loading state of button and input', () => {
    const wrapper = shallow(Component);

    expect(wrapper.find('.input').prop('disabled')).toBe(false);
    expect(wrapper.find('.button').prop('disabled')).toBe(false);
    wrapper.setProps({ isLoading: true });
    expect(wrapper.find('.input').prop('disabled')).toBe(true);
    expect(wrapper.find('.button').prop('disabled')).toBe(true);
  });

  it('should call onFormSubmit, with input value', () => {
    const wrapper = mount(Component);
    const preventDefault = jest.fn();

    expect(onFormSubmit).toHaveBeenCalledTimes(0);
    expect(preventDefault).toHaveBeenCalledTimes(0);
    wrapper.find('.input').instance().value = 'muse';
    wrapper.find('.form').simulate('submit', { preventDefault });
    expect(onFormSubmit).toHaveBeenCalledTimes(1);
    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(onFormSubmit).toHaveBeenCalledWith('muse');
  });

  it('should call inputFocusHandler', () => {
    const wrapper = shallow(Component);
    const select = jest.fn();

    expect(select).toHaveBeenCalledTimes(0);
    wrapper.find('.input').simulate('focus', { target: { select } });
    expect(select).toHaveBeenCalledTimes(1);
  });
});
