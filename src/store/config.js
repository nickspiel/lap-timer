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
  composeEnhancers(applyMiddleware(thunk, socketMiddleware(socket))),
);

// Dispatch all socket messages to the store
socket.onmessage = (event) => {
  store.dispatch(JSON.parse(event.data));
};

export default store;
