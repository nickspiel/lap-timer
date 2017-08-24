import * as constants from '../constants';

// UI actions
export const setError = message => ({
  type: constants.SET_ERROR,
  message,
});

export const dismissError = () => ({
  type: constants.DISMISS_ERROR,
});

export const setDevices = devices => ({
  type: constants.SET_DEVICES,
  devices,
});

export const setLoading = status => ({
  type: constants.SET_LOADING,
  status,
});

export const setActiveRacer = (index, totalNumber) => ({
  type: constants.SET_ACTIVE_RACER,
  index,
  totalNumber,
});

export const requestIncreaseLaps = () => ({
  type: constants.INCREASE_LAPS,
});

export const requestDecreaseLaps = () => ({
  type: constants.DECREASE_LAPS,
});

// Responses
export const setNumberOfRacers = data => ({
  type: constants.SET_NUMBER_OF_RACERS,
  racers: data,
});

export const setRaceStatus = (data, status) => ({
  type: constants.SET_RACE_STATUS,
  status,
});

export const setChannel = (data) => {
  const channel = data.slice(-1);
  return ({
    type: constants.SET_CHANNEL,
    channel,
  });
};

export const setThreshold = data => ({
  type: constants.SET_THRESHOLD,
  threshold: data,
});

export const setSoundStatus = data => ({
  type: constants.SET_SOUNDS,
  status: data,
});

export const setCalibratrion = data => ({
  type: constants.SET_CALIBRATRION,
  status: data,
});

export const setRSSIStatus = data => ({
  type: constants.SET_RSSI_STATUS,
  status: data,
});

export const setRacerRSSIThreshold = (data) => {
  const { id } = data;
  return (dispatch) => {
    dispatch({
      type: constants.SET_RACER_RSSI_THRESHOLD,
      data,
    });
    dispatch({
      type: constants.REQUEST_SET_THRESHOLD,
      id,
    });
    dispatch({
      type: constants.REQUEST_RSSI_MONITOR_OFF,
      id,
    });
  };
};

export const setSkipFirstLap = status => ({
  type: constants.SET_SKIP_FIRST_LAP,
  data: status,
});

export const setLapTime = data => ({
  type: constants.SET_LAP_TIME,
  time: data,
});

export const updateRacerNameAction = (id, name) => ({
  type: constants.UPDATE_RACER_NAME,
  name,
  id,
});
