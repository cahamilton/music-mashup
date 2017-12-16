import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './App';

const RootContainer = document.getElementById('musicMashup');

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  RootContainer,
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      RootContainer,
    );
  });
}
