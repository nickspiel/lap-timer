import * as constants from '../../constants';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case constants.SET_NUMBER_OF_RACERS:
      return ({
        ...state,
        racers: [...Array(action.data).keys()].map(number => ({ id: number + 1 })),
      });
    case constants.UPDATE_RACER_NAME:
    console.log(action.id);
    console.log(state.racers);
    console.log(state.racers.splice(0, action.id - 1));
    console.log(state.racers.splice(action.id - 1, 0));
      return ({
        ...state,
        racers: [
          ...state.racers.splice(0, action.id - 1),
          {
            ...state.racers[action.id - 1],
            name: action.name,
          },
          ...state.racers.splice(action.id, 0),
        ],
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
