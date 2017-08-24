import * as constants from '../constants';

export const requestConnectDevice = (address, channel) => ({
  type: constants.REQUEST_CONNECT_DEVICE,
  address,
  channel,
});

export const requestStartRace = () => ({
  type: constants.REQUEST_START_RACE,
});

export const requestEndRace = () => ({
  type: constants.REQUEST_END_RACE,
});

export const requestIncreaseMinimumLapTime = () => ({
  type: constants.REQUEST_INCREASE_MINIMUM_LAP_TIME,
});

export const requestDecreaseMinimumLapTime = () => ({
  type: constants.REQUEST_DECREASE_MINIMUM_LAP_TIME,
});

export const requestNextBand = id => ({
  type: constants.REQUEST_NEXT_BAND,
  id,
});

export const requestPreviousBand = id => ({
  type: constants.REQUEST_PREVIOUS_BAND,
  id,
});

export const requestNextChannel = id => ({
  type: constants.REQUEST_NEXT_CHANNEL,
  id,
});

export const requestPreviousChannel = id => ({
  type: constants.REQUEST_PREVIOUS_CHANNEL,
  id,
});

export const requestIncreaseThreshold = id => ({
  type: constants.REQUEST_INCREASE_THRESHOLD,
  id,
});

export const requestDecreaseThreshold = id => ({
  type: constants.REQUEST_DECREASE_THRESHOLD,
  id,
});

export const requestToggleSound = () => ({
  type: constants.REQUEST_TOGGLE_SOUND,
});

export const requestStartCalibration = () => ({
  type: constants.REQUEST_START_CALIBRATION,
});

export const requestEndCalibration = () => ({
  type: constants.REQUEST_END_CALIBRATION,
});

export const requestRssiMonitorOn = id => ({
  type: constants.REQUEST_RSSI_MONITOR_ON,
  id,
});

export const requestRssiMonitorOff = id => ({
  type: constants.REQUEST_RSSI_MONITOR_OFF,
  id,
});

export const requestToggleFirstLap = () => ({
  type: constants.REQUEST_TOGGLE_FIRST_LAP,
});
