import * as constants from '../constants';

const sendMessage = (socket, type, data = {}) => (
  socket.send(JSON.stringify({ type, data }))
);

const socketMiddleware = socket => (() => (
  () => next => (action) => {
    const type = action.type;
    switch (type) {
      case constants.GET_DEVICE_LIST:
        sendMessage(socket, type);
        break;
      case constants.CONNECT_DEVICE:
        sendMessage(socket, type, { address: action.address, channel: action.channel });
        break;
      default:
        break;
    }
    return next(action);
  }
))();

export default socketMiddleware;
