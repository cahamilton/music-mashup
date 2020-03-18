import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { Provider } from 'react-redux';

import App from './App';
import reducers from './reducers/reducers';

const enhancer = compose(
  applyMiddleware(thunk),
  devToolsEnhancer(),
);

const store = createStore(
  reducers,
  enhancer,
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
