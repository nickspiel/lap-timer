import * as constants from '../constants';

const sendMessage = (socket, store, type, data = {}) => {
  socket.send(JSON.stringify({ type, data }), error => store.dispatch({
    type: constants.SET_ERROR,
    data: error.toString(),
  }));
};

// TODO Access store directly for needed data

const socketMiddleware = socket => (() => (
  store => next => (action) => {
    const { type, id } = action;
    switch (type) {
      case constants.REQUEST_CONNECT_DEVICE:
        sendMessage(socket, store, type, { address: action.address });
        break;
      case constants.REQUEST_DEVICE_LIST:
      case constants.REQUEST_START_RACE:
      case constants.REQUEST_END_RACE:
      case constants.REQUEST_INCREASE_MINIMUM_LAP_TIME:
      case constants.REQUEST_DECREASE_MINIMUM_LAP_TIME:
      case constants.REQUEST_NEXT_BAND:
      case constants.REQUEST_PREVIOUS_BAND:
      case constants.REQUEST_NEXT_CHANNEL:
      case constants.REQUEST_PREVIOUS_CHANNEL:
      case constants.REQUEST_INCREASE_THRESHOLD:
      case constants.REQUEST_DECREASE_THRESHOLD:
      case constants.REQUEST_SET_THRESHOLD:
      case constants.REQUEST_TOGGLE_SOUND:
      case constants.REQUEST_START_CALIBRATION:
      case constants.REQUEST_END_CALIBRATION:
      case constants.REQUEST_RSSI_MONITOR_ON:
      case constants.REQUEST_RSSI_MONITOR_OFF:
      case constants.REQUEST_TOGGLE_FIRST_LAP:
        sendMessage(socket, store, type, id);
        break;
      default:
        break;
    }
    return next(action);
  }
))();

export default socketMiddleware;
