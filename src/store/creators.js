import * as actions from '../constants';

export const setDevices = devices => ({
  type: actions.SET_DEVICES,
  devices,
});

export const getDeviceList = () => ({
  type: actions.GET_DEVICE_LIST,
});

export const connectDevice = (address, channel) => ({
  type: actions.CONNECT_DEVICE,
  address,
  channel,
});

export const dismissError = () => ({
  type: actions.DISMISS_ERROR,
});
