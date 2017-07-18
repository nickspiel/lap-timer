import * as constants from '../../constants';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case constants.SET_DEVICES:
      return {
        ...state,
        loading: false,
      };
    case constants.SET_ERROR:
      return {
        ...state,
        loading: false,
        error: {
          message: action.data,
          show: true,
        },
      };
    case constants.DISMISS_ERROR:
      return {
        ...state,
        error: {
          message: '',
          show: false,
        },
      };
    case constants.REQUEST_CONNECT_DEVICE:
      return {
        ...state,
        loading: true,
      };
    case constants.SET_DEVICE_CONNECTED:
      return {
        ...state,
        deviceConnected: true,
        loading: false,
      };
    case constants.SET_ACTIVE_RACER:
      return {
        ...state,
        activeRacer: (action.index - 1 < action.totalNumber && action.index >= 0)
        ? action.index
        : state.activeRacer,
      };
    case constants.SET_RSSI_STATUS:
      return {
        ...state,
        rssiMonitoring: action.data === 1,
      };
    case constants.SET_RSSI_VALUE:
      return {
        ...state,
        rssiValue: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
