import _ from 'lodash';
import * as constants from '../constants';

const checkForVoiceMatch = (store, lastWord) => (words = [], action) => {
  if (words.includes(lastWord)) {
    store.dispatch({ type: action });
  }
};

const translateToAction = (event, store) => {
  const { resultIndex } = event;
  const lastWord = _.chain(event.results)
    .nth(resultIndex)
    // .find('isFinal')
    .last()
    .get('transcript')
    .split(' ')
    .last()
    .toLower()
    .value();

  const checkForMatchWithStore = checkForVoiceMatch(store, lastWord);
  constants.VOICE_COMMANDS.forEach((command) => {
    checkForMatchWithStore(command.words, command.action);
  });
};

const voiceRecognition = (store) => {
  const recognition = new webkitSpeechRecognition(); // eslint-disable-line

  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onresult = event => translateToAction(event, store);
  recognition.onerror = () => recognition.stop();
  recognition.onend = () => recognition.start();
  recognition.start();
};

export default voiceRecognition;
