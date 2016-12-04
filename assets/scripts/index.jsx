import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';
import '../stylesheets/base/font-face.pcss';
import '../stylesheets/base/global.pcss';

class Mashup extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <h1>Music Mashup</h1>
      </div>
    );
  }

}

ReactDOM.render(
  <Mashup />,
  document.getElementById('musicMashup'),
);
