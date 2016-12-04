import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';
import '../stylesheets/base/font-face.pcss';
import '../stylesheets/base/global.pcss';

import Header from './components/Header/Header';
import Main from './components/Main/Main';

class Mashup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: { query: '', matches: [] },
      alternative: { isVisible: false },
    };
    this.updateParentState = this.updateParentState.bind(this);
  }

  updateParentState(object) {
    this.setState(object);
  }

  render() {
    return (
      <div className="container">
        <Header
          searchState={this.state.search}
          alternativeState={this.state.alternative}
          updateParentState={this.updateParentState}
        />
        <Main
          searchState={this.state.search}
          alternativeState={this.state.alternative}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <Mashup />,
  document.getElementById('musicMashup'),
);
