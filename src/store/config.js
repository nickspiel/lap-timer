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
      racers: [],
    },
    ui: {
      rssiValue: 0,
      loading: true,
      deviceConnected: false,
      error: {},
      raceStarted: false,
      activeRacer: 0,
      racerColors: ['#9C27B0', '#C2185B', '#303F9F', '#0097A7', '#388E3C', '#FF5722'],
    },
  },
  composeEnhancers(applyMiddleware(thunk, socketMiddleware(socket))),
);

// Dispatch all socket messages to the store
// TODO This is dumb, need action creators
socket.onmessage = (event) => {
  store.dispatch(JSON.parse(event.data));
};

export default store;
