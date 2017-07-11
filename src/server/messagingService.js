import {
  setNumberOfRacers,
  setRaceStatus,
  setMinimumLapTime,
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
  // Match uppercase letters in response
  const matches = message.match(/(S)[0-9]([A-Z])[0-9]/);

  let code;

  if (matches) {
    // Remove the full match if a match is made
    matches.shift();

    // Join the matched pattern
    code = matches.join('');
  }

  const actions = {
    N: () => setNumberOfRacers(),
    SR: () => setRaceStatus(message),
    SM: () => sendMessage(constants.SET_MINIMUM_LAP_TIME, setMinimumLapTime(message)),
    SB: () => setBand(),
    SC: () => setChannel(message),
    ST: () => setThreshold(),
    SD: () => setSoundStatus(),
    SI: () => setCalibratrion(),
    SV: () => setRSSIStatus(),
    SF: () => setSkipFirstLap(),
    SS: () => setRSSIValue(),
    SL: () => setLapTime(),
    default: () => sendMessage(constants.SET_ERROR, `No action match found for ${message}`),
  };

  return (actions[code] || actions.default)();
};

export const collectMessages = (sendMessage, buffer) => {
  const bufferString = buffer.toString('utf-8');

  // Collect message fragments
  messageFragments += bufferString;

  // Find whole matches (letters and numbers preeceed newline character)
  const messages = messageFragments.match(/([A-Za-z0-9]*)(?=\n)/g);

  // Loop over each whole match
  messages.forEach((message) => {
    // Remove the matched message from the fragments
    messageFragments.replace(`${message}\n`, '');

    // Translate and send the message
    sendMessage(translateIncomming(sendMessage, message));
  });
};
