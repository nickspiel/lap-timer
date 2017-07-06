import { combineReducers } from 'redux';
import devices from './devices';
import ui from './ui';
import race from './race';

export default combineReducers({
  devices,
  ui,
  race,
});
