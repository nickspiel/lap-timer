import { combineReducers } from 'redux';
import devices from './devices';
import ui from './ui';

export default combineReducers({
  devices,
  ui,
});
