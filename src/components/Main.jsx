import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDeviceList } from '../store/creators';
import DeviceButton from './DeviceButton';

const Main = ({ devices = [], getDeviceListAction }) => (
  <main>
    <button onClick={getDeviceListAction}>Connect</button>
    <ul>
      {devices.map(device => (
        <DeviceButton key={device.address} {...device} />
      ))}
    </ul>
  </main>
);

Main.propTypes = {
  devices: PropTypes.arrayOf(PropTypes.object).isRequired,
  getDeviceListAction: PropTypes.func.isRequired,
};

export default connect(
  state => ({ devices: state.devices }),
  { getDeviceListAction: getDeviceList },
)(Main);
