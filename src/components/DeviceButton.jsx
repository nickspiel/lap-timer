import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { connectDevice } from '../store/creators';

const Main = ({ name, address, connectDeviceAction }) => (
  <button onClick={() => connectDeviceAction(address)}>{name}</button>
);

export const mainPropTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};

Main.propTypes = {
  ...mainPropTypes,
  connectDeviceAction: PropTypes.func.isRequired,
};

export default connect(
  null,
  { connectDeviceAction: connectDevice },
)(Main);
