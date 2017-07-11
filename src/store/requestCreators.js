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

export const requestNextBand = () => ({
  type: constants.REQUEST_NEXT_BAND,
});

export const requestPreviousBand = () => ({
  type: constants.REQUEST_PREVIOUS_BAND,
});

export const requestNextChannel = () => ({
  type: constants.REQUEST_NEXT_CHANNEL,
});

export const requestPreviousChannel = () => ({
  type: constants.REQUEST_PREVIOUS_CHANNEL,
});

export const requestIncreaseThreshold = () => ({
  type: constants.REQUEST_INCREASE_THRESHOLD,
});

export const requestDecreaseThreshold = () => ({
  type: constants.REQUEST_DECREASE_THRESHOLD,
});

export const requestSetThreshold = () => ({
  type: constants.REQUEST_SET_THRESHOLD,
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

export const requestRssiMonitorOn = () => ({
  type: constants.REQUEST_RSSI_MONITOR_ON,
});

export const requestRssiMonitorOff = () => ({
  type: constants.REQUEST_RSSI_MONITOR_OFF,
});

export const requestToggleFirstLap = () => ({
  type: constants.REQUEST_TOGGLE_FIRST_LAP,
});
