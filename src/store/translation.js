import * as constants from '../constants';

const translateIncomming = (buffer) => {
  let message = buffer.toString('utf-8').trim();
  message = 'S0R1\nS1R1\n';
  const matches = message.match(/(S)[0-9]([A-Z])[0-9]/);
  matches.shift();
  const code = matches.join('');
  switch (code) {
    case 'N': console.log(constants.SET_NUMBER_OF_RACERS);
      break;
    case 'SR': console.log(constants.SET_RACE_STATUS);
      break;
    case 'SM': console.log(constants.SET_MINIMUM_LAP_TIME);
      break;
    case 'SB': console.log(constants.SET_BAND);
      break;
    case 'SC': console.log(constants.SET_CHANNEL);
      break;
    case 'ST': console.log(constants.SET_THRESHOLD);
      break;
    case 'SD': console.log(constants.SET_SOUNDS);
      break;
    case 'SI': console.log(constants.SET_CALIBRATRION);
      break;
    case 'SV': console.log(constants.SET_RSSI_STATUS);
      break;
    case 'SF': console.log(constants.SET_SKIP_FIRST_LAP);
      break;
    case 'SS': console.log(constants.SET_RSSI_VALUE);
      break;
    case 'SL': console.log(constants.SET_LAP_TIME);
      break;
    default:
      console.log('none');
  }
};

export default translateIncomming;
