import {
  setSoundStatus,
  setSkipFirstLap,
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
      data: parseInt(message.match(/N([A-Za-z0-9]*)/)[1], 16),
    }),
    SR: () => ({
      type: constants.SET_RACE_STATUS,
      data: parseInt(message.match(/R([A-Za-z0-9]*)/)[1], 16),
    }),
    SM: () => ({
      type: constants.SET_MINIMUM_LAP_TIME,
      data: parseInt(message.match(/M([A-Za-z0-9]*)/)[1], 16),
    }),
    SB: () => ({
      type: constants.SET_BAND,
      data: parseInt(message.match(/B([A-Za-z0-9]*)/)[1], 16),
    }),
    SC: () => ({
      type: constants.SET_CHANNEL,
      data: parseInt(message.match(/C([A-Za-z0-9]*)/)[1], 16),
    }),
    ST: () => {
      const [match, id, value] = message.match(/S([0-9])T([A-Za-z0-9]*)/);// eslint-disable-line
      return ({
        type: constants.SET_RACER_RSSI_THRESHOLD,
        data: {
          id: parseInt(id, 16),
          value: parseInt(value, 16),
        },
      });
    },
    SD: () => setSoundStatus(),
    SI: () => ({
      type: constants.SET_CALIBRATION_ENDED,
      data: parseInt(message.match(/I([A-Za-z0-9]*)/)[1], 16),
    }),
    Si: () => ({
      type: constants.SET_CALIBRATION_STATE,
      data: parseInt(message.match(/i([A-Za-z0-9]*)/)[1], 16),
    }),
    SV: () => ({
      type: constants.SET_RSSI_STATUS,
      data: parseInt(message.match(/S.V([A-Za-z0-9]*)/)[1], 16),
    }),
    SF: () => setSkipFirstLap(),
    SS: () => ({
      type: constants.SET_RSSI_VALUE,
      data: parseInt(message.match(/S.S([A-Za-z0-9]*)/)[1], 16),
    }),
    SL: () => {
      const [match, id, value] = message.match(/S([0-9])L..([A-Za-z0-9]*)/);// eslint-disable-line

      return ({
        type: constants.SET_LAP_TIME,
        data: {
          id: parseInt(id, 16),
          value: parseInt(value, 16),
        },
      });
    },
    SX: () => ({
      type: 'FINISHED_BULK_STATE', // TODO
      data: true,
    }),
    SP: () => ({
      type: constants.SET_SKIP_FIRST_LAP, // TODO
      data: true,
    }),
    default: () => ({
      type: constants.SET_ERROR,
      data: `No action match found for ${message}`,
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
      const { type, data } = translateIncomming(sendMessage, message);
      console.log('translateIncomming', type, data);
      // Send the message
      sendMessage(type, data);
    });
  }
};
