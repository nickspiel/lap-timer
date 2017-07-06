import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDeviceList } from '../store/creators';
import DeviceButton, { mainPropTypes } from './DeviceButton';
import ErrorMessage from './ErrorMessage';
import translateIncomming from '../store/translation';

const Main = ({ devices, getDeviceListAction }) => (
  <main>
    {translateIncomming('test')}
    <ErrorMessage />
    <button onClick={getDeviceListAction}>Connect</button>
    <div>
      {devices.map(device => (
        <DeviceButton key={device.address} {...device} />
      ))}
    </div>
  </main>
);

Main.defaultProps = {
  devices: [],
};

Main.propTypes = {
  devices: PropTypes.arrayOf(PropTypes.shape(mainPropTypes)),
  getDeviceListAction: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    devices: state.devices,
    messages: state.messages,
  }),
  { getDeviceListAction: getDeviceList },
)(Main);
