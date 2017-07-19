import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/root';
import socketMiddleware from './socketMiddleware';

// Create socket
const socket = new WebSocket('ws://localhost:8080');

// Create store with enhancements
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  {
    devices: [],
    race: {
      laps: 5,
      racers: [
        {
          id: 0, // TODO remove
          lastLapTime: 24577,
          bestLapTime: 23458,
          totalTime: 104678,
        },
        {
          id: 1, // TODO remove
          lastLapTime: 26577,
          bestLapTime: 24756,
          totalTime: 105768,
        },
      ],
    },
    ui: {
      rssiValue: 125, // TODO Remove
      loading: true,
      deviceConnected: true, // TODO remove
      error: {},
      activeRacer: 0,
    },
  },
  composeEnhancers(applyMiddleware(thunk, socketMiddleware(socket))),
);

// Dispatch all socket messages to the store
// TODO This is dumb, need action creators
socket.onmessage = (event) => {
  console.log('socket onmessage', JSON.parse(event.data));
  store.dispatch(JSON.parse(event.data));
};

export default store;
