import React from 'react';

import 'normalize.css';
import '../stylesheets/base/font-face.pcss';
import '../stylesheets/base/global.pcss';

import Header from './components/Header/Header';
import Main from './components/Main/Main';

const App = () => (
  <div className="container">
    <Header />
    <Main />
  </div>
);

export default App;
