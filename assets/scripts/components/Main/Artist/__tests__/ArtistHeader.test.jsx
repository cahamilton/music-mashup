/** @format */

import React from 'react';
import { shallow } from 'enzyme';

import ArtistHeader from '../ArtistHeader';

describe('ArtistHeader', () => {
  const artistName = 'Muse';
  const artistGenre = 'Alternative Rock';

  it('should return null', () => {
    const component = shallow(<ArtistHeader />);
    expect(component.isEmptyRender()).toBe(true);
  });

  it('should not return null', () => {
    const component = shallow(<ArtistHeader name={artistName} />);
    expect(component.isEmptyRender()).toBe(false);
  });

  it('should return element with artists name', () => {
    const component = shallow(<ArtistHeader name={artistName} />);
    const title = component.find('.name');
    expect(title).toHaveLength(1);
    expect(title.text()).toEqual(artistName);
  });

  it('should not return element with artists genre', () => {
    const component = shallow(<ArtistHeader name={artistName} />);
    const title = component.find('.genre');
    expect(title).toHaveLength(0);
  });

  it('should return element with artists genre', () => {
    const component = shallow(
      <ArtistHeader name={artistName} genre={artistGenre} />,
    );
    const title = component.find('.genre');
    expect(title).toHaveLength(1);
    expect(title.text()).toEqual(artistGenre);
  });
});
