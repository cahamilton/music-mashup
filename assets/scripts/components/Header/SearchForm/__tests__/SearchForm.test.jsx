import React from 'react';
import renderer from 'react-test-renderer';

import styles from '../../Search/Search.pcss';
import SearchForm from '../../SearchForm/SearchForm';

describe('SearchForm', () => {
  const onFormSubmit = () => {};

  test('toggle loading state of search form', () => {
    const component = renderer.create(
      <SearchForm
        isLoading
        onFormSubmit={onFormSubmit}
      />,
    );
    const root = component.root;
    const input = root.findByProps({ className: styles.input });
    const button = root.findByProps({ className: styles.button });
    expect(input.props.disabled).toEqual(true);
    expect(button.props.disabled).toEqual(true);
  });
});
