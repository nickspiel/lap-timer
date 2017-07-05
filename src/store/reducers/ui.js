import * as constants from '../../constants';

const reducer = (state = {}, action) => {
  console.log(action);
  switch (action.type) {
    case constants.DISPLAY_ERROR:
      return { ...action.data };
    default:
      return state;
  }
};

export default reducer;
