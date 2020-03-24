/** @format */

import React from 'react';
import { shallow } from 'enzyme';

import ArtistBiography from '../ArtistBiography';
import ContentBlock from '../../../ContentBlock/ContentBlock';

describe('ArtistBiography', () => {
  const extract = 'This band is awesome';
  const image = 'https://wikipedia.com/awesome-band.jpg';
  const source = 'https://wikipedia.com/awesome-band';

  it('should return null if !source || !isLoading', () => {
    const wrapper = shallow(<ArtistBiography />);
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('should render instance of ContentBlock', () => {
    const wrapper = shallow(<ArtistBiography source={source} />);
    expect(wrapper.find(ContentBlock)).toHaveLength(1);
  });

  it('should render source', () => {
    const wrapper = shallow(<ArtistBiography source={source} />);
    expect(wrapper.find('.source')).toHaveLength(1);
  });

  it('should render image', () => {
    const wrapper = shallow(<ArtistBiography source={source} image={image} />);
    expect(wrapper.find('.image')).toHaveLength(1);
  });

  it('should render extract', () => {
    const wrapper = shallow(
      <ArtistBiography source={source} extract={extract} />,
    );
    expect(wrapper.find('.extract')).toHaveLength(1);
  });
});
