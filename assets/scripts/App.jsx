import React from 'react';

import 'normalize.css';
import '../stylesheets/base/font-face.pcss';
import '../stylesheets/base/global.pcss';

import Header from './components/Header/Header';

const App = () => (
  <div className="container">
    <Header />
  </div>
);

export default App;
