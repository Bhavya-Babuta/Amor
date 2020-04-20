import { constants } from "../../../../constants";

const initialState = {
  user: null,
  error: null,
};

function userReducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case constants.USER.ADD_USER_STORE:
      newState.user = action.payload.user;
      return newState;
    case constants.USER.REMOVE_USER_STORE:
      newState.user = null;
      return newState;
    case constants.USER.UPDATE_USER_STORE:
      newState.user = Object.assign(
        {},
        state.user,
        action.payload.updatePayload
      );
      return newState;
    default:
      return state;
  }
}

export default userReducer;
