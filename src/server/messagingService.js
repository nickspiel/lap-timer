import {
  setThreshold,
  setSoundStatus,
  setRSSIStatus,
  setSkipFirstLap,
  setLapTime,
} from '../store/actionCreators';
import * as constants from '../constants';

// Empty string to hold message fragments
let messageFragments = '';

export const translateIncomming = (sendMessage, buffer) => {
  const message = buffer.toString('utf-8').trim();

  // Match message format in response
  const matches = message.match(/([SN])[0-9]?([A-Za-z0-9])/);

  let code;

  if (matches) {
    console.log(matches);
    // Remove the full match if a match is made
    matches.shift();

    // Join the matched pattern and strip numbers
    code = matches.join('').replace(/\d+/g, '');
  }

  const actions = {
    N: () => ({
      type: constants.SET_NUMBER_OF_RACERS,
      value: parseInt(message.match(/N([A-Za-z0-9]*)/)[1], 16),
    }),
    SR: () => ({
      type: constants.SET_RACE_STATUS,
      value: parseInt(message.match(/R([A-Za-z0-9]*)/)[1], 16),
    }),
    SM: () => ({
      type: constants.SET_MINIMUM_LAP_TIME,
      value: parseInt(message.match(/M([A-Za-z0-9]*)/)[1], 16),
    }),
    SB: () => ({
      type: constants.SET_BAND,
      value: parseInt(message.match(/B([A-Za-z0-9]*)/)[1], 16),
    }),
    SC: () => ({
      type: constants.SET_CHANNEL,
      value: parseInt(message.match(/C([A-Za-z0-9]*)/)[1], 16),
    }),
    ST: () => setThreshold(),
    SD: () => setSoundStatus(),
    SI: () => ({
      type: constants.SET_CALIBRATION_ENDED,
      value: parseInt(message.match(/I([A-Za-z0-9]*)/)[1], 16),
    }),
    Si: () => ({
      type: constants.SET_CALIBRATION_STATE,
      value: parseInt(message.match(/i([A-Za-z0-9]*)/)[1], 16),
    }),
    SV: () => ({
      type: constants.SET_RSSI_STATUS,
      value: parseInt(message.match(/S.V([A-Za-z0-9]*)/)[1], 16),
    }),
    SF: () => setSkipFirstLap(),
    SS: () => ({
      type: constants.SET_RSSI_VALUE,
      value: parseInt(message.match(/S.S([A-Za-z0-9]*)/)[1], 16),
    }),
    SL: () => setLapTime(),
    default: () => ({
      type: constants.SET_ERROR,
      value: `No action match found for ${message}`,
    }),
  };

  return (actions[code] || actions.default)();
};

export const collectMessages = (sendMessage, buffer) => {
  const bufferString = buffer.toString('utf-8');

  // Collect message fragments
  messageFragments += bufferString;

  // Find whole matches (letters and numbers preeceed newline character)
  const messages = messageFragments.match(/([A-Z].*)(?=\n)/g);

  if (messages) {
    // Loop over each whole match
    messages.forEach((message) => {
      // Remove the matched message from the fragments
      const messageMatch = RegExp(`${message}\n`, 'g');
      messageFragments = messageFragments.replace(messageMatch, '');

      // Translate the message to an action
      const { type, value } = translateIncomming(sendMessage, message);
      console.log('translateIncomming', type, value);
      // Send the message
      sendMessage(type, value);
    });
  }
};
