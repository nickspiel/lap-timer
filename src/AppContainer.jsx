import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import Main from './components/Main';

// wsConnection.onmessage = (event) => {
//   const { type, data } = JSON.parse(event.data)
//   store().dispatch({ type: constants[type], data })
// }
//
// const getDevices = () => {
//   wsConnection.send(constants.GET_DEVICE_LIST)
// }

const AppContainer = ({ store }) => (
  <Provider store={store}>
    <Main />
  </Provider>
);

AppContainer.propTypes = {
  store: PropTypes.object.isRequired,
};

export default AppContainer;
