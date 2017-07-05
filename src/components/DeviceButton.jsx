import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { connectDevice } from '../store/creators';

const Main = ({ name, address, channel, connectDeviceAction }) => (
  <button onClick={() => connectDeviceAction(address, channel)}>{name} - {channel}</button>
);

Main.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  channel: PropTypes.number.isRequired,
  connectDeviceAction: PropTypes.func.isRequired,
};

export default connect(
  null,
  { connectDeviceAction: connectDevice },
)(Main);
