import React from 'react';
import renderer from 'react-test-renderer';
import AlternativeToggle from '../AlternativeToggle';

describe('AlternativeToggle', () => {
  const onClick = () => {};

  test('return null if props.isVisible is false', () => {
    const component = renderer.create(
      <AlternativeToggle onClick={onClick} />,
    );
    const json = component.toJSON();
    expect(json).toBeNull();
  });

  test('return button is props.isVisible is true', () => {
    const component = renderer.create(
      <AlternativeToggle onClick={onClick} isVisible />,
    );
    const root = component.root;
    expect(root.findByType('button')).toBeTruthy();
  });
});
