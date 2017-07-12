// State actions
export const SET_DEVICES = 'SET_DEVICES';
export const SET_ERROR = 'SET_ERROR';
export const DISMISS_ERROR = 'DISMISS_ERROR';
export const SET_LOADING = 'SET_LOADING';
export const INCREASE_LAPS = 'INCREASE_LAPS';
export const DECREASE_LAPS = 'DECREASE_LAPS';
export const UPDATE_RACER_NAME = 'UPDATE_RACER_NAME';

// Bluetooth requests
export const REQUEST_DEVICE_LIST = 'REQUEST_DEVICE_LIST';
export const REQUEST_CONNECT_DEVICE = 'REQUEST_CONNECT_DEVICE';
export const REQUEST_BULK_DEVICE_STATE = 'A';
export const REQUEST_START_RACE = 'R';
export const REQUEST_END_RACE = 'r';
export const REQUEST_INCREASE_MINIMUM_LAP_TIME = 'M';
export const REQUEST_DECREASE_MINIMUM_LAP_TIME = 'm';
export const REQUEST_NEXT_BAND = 'B';
export const REQUEST_PREVIOUS_BAND = 'b';
export const REQUEST_NEXT_CHANNEL = 'C';
export const REQUEST_PREVIOUS_CHANNEL = 'c';
export const REQUEST_INCREASE_THRESHOLD = 'T';
export const REQUEST_DECREASE_THRESHOLD = 't';
export const REQUEST_SET_THRESHOLD = 'S';
export const REQUEST_TOGGLE_SOUND = 'D';
export const REQUEST_START_CALIBRATION = 'I';
export const REQUEST_END_CALIBRATION = 'i';
export const REQUEST_RSSI_MONITOR_ON = 'V';
export const REQUEST_RSSI_MONITOR_OFF = 'v';
export const REQUEST_TOGGLE_FIRST_LAP = 'F';

// Bluetooth responses
export const SET_DEVICE_CONNECTED = 'SET_DEVICE_CONNECTED';
export const SET_NUMBER_OF_RACERS = 'SET_NUMBER_OF_RACERS';
export const SET_RACE_STATUS = 'SET_RACE_STATUS';
export const SET_MINIMUM_LAP_TIME = 'SET_MINIMUM_LAP_TIME';
export const SET_BAND = 'SET_BAND';
export const SET_CHANNEL = 'SET_CHANNEL';
export const SET_THRESHOLD = 'SET_THRESHOLD';
export const SET_SOUNDS = 'SET_SOUNDS';
export const SET_CALIBRATRION = 'SET_CALIBRATRION';
export const SET_RSSI_STATUS = 'SET_RSSI_STATUS';
export const SET_SKIP_FIRST_LAP = 'SET_SKIP_FIRST_LAP';
export const SET_RSSI_VALUE = 'SET_RSSI_VALUE';
export const SET_LAP_TIME = 'SET_LAP_TIME';
