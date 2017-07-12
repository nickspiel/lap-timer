import {
  setRaceStatus,
  setBand,
  setChannel,
  setThreshold,
  setSoundStatus,
  setCalibratrion,
  setRSSIStatus,
  setRSSIValue,
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
    SR: () => setRaceStatus(message),
    SM: () => ({
      type: constants.SET_MINIMUM_LAP_TIME,
      value: parseInt(message.match(/M([A-Za-z0-9]*)/)[1], 16),
    }),
    SB: () => setBand(),
    SC: () => setChannel(message),
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
    SV: () => setRSSIStatus(),
    SF: () => setSkipFirstLap(),
    SS: () => setRSSIValue(),
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

      // Send the message
      sendMessage(type, value);
    });
  }
};
