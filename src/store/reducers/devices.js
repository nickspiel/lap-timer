import * as constants from '../../constants';

const reducer = (state = [], action) => {
  switch (action.type) {
    case constants.SET_DEVICES:
      return ([
        ...action.data,
      ]);
    default:
      return state;
  }
};

export default reducer;
