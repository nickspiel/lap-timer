import * as constants from '../../constants';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case constants.DISPLAY_ERROR:
      return {
        ...state,
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
    case constants.DEVICE_CONNECTED:
      return {
        ...state,
        deviceConnected: true,
      };
    default:
      return state;
  }
};

export default reducer;
