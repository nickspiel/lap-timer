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

const translateIncomming = (buffer, sendMessage) => {
  const message = buffer.toString('utf-8').trim();
  // Match uppercase letters in response
  const matches = message.match(/(S)[0-9]([A-Z])[0-9]/);
  console.log(matches);
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

export default translateIncomming;
