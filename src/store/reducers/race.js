import * as constants from '../../constants';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case constants.SET_NUMBER_OF_RACERS:
      return ({
        ...state,
        racers: [...Array(action.data).keys()].map(number => ({ id: number + 1 })),
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
    case constants.APPLY_BAND:
      return ({
        ...state,
        racers: state.racers.map(racer => (
          racer.id === action.activeRacer
          ? { ...racer, band: action.band }
          : { ...racer }
        )),
      });
    default:
      return state;
  }
};

export default reducer;
