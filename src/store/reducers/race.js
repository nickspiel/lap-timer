import * as constants from '../../constants';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case constants.SET_NUMBER_OF_RACERS:
      return ({
        ...state,
        racers: action.data,
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
    default:
      return state;
  }
};

export default reducer;
