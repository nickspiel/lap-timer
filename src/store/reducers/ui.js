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
    default:
      return state;
  }
};

export default reducer;
