import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './AppContainer';
import storeConfig from './store/config';

ReactDOM.render(
  <AppContainer store={storeConfig} />,
  document.getElementById('main'),
);
