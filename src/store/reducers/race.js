import * as constants from '../../constants';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case constants.SET_NUMBER_OF_RACERS:
      return ({
        ...state,
        racers: action.data,
      });
    default:
      return state;
  }
};

export default reducer;
