import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import App from './App';

const store = createStore(
  devToolsEnhancer(),
);

const RootContainer = document.getElementById('musicMashup');

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    RootContainer,
  );
};

store.subscribe(render);

render();
