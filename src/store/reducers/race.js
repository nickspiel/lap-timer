import * as constants from '../../constants';
import store from '../config';

const activeRacer = () => store.getState().ui.activeRacer;

const reducer = (state = {}, action) => {
  switch (action.type) {
    case constants.SET_NUMBER_OF_RACERS:
      return ({
        ...state,
        racers: [...Array(action.data).keys()].map(number => ({ id: number })),
      });
    case constants.UPDATE_RACER_NAME:
      return ({
        ...state,
        racers: state.racers.map(racer => (
          racer.id === action.id ? { ...racer, name: action.name } : racer
        )),
      });
    case constants.SET_MINIMUM_LAP_TIME:
      return ({
        ...state,
        minLapTime: action.data,
      });
    case constants.INCREASE_LAPS:
      return ({
        ...state,
        laps: state.laps + 1,
      });
    case constants.DECREASE_LAPS:
      return ({
        ...state,
        laps: state.laps !== 1 ? state.laps - 1 : 1,
      });
    case constants.SET_BAND:
      return ({
        ...state,
        racers: state.racers.map(racer => (
          racer.id === activeRacer()
          ? { ...racer, band: action.data }
          : { ...racer }
        )),
      });
    case constants.SET_CHANNEL:
      return ({
        ...state,
        racers: state.racers.map(racer => (
          racer.id === activeRacer()
          ? { ...racer, channel: action.data }
          : { ...racer }
        )),
      });
    default:
      return state;
  }
};

export default reducer;
