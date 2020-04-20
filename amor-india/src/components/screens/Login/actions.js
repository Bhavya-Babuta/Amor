import { constants } from "../../../../constants";

export const addUserProfileToStore = (user) => ({
  type: constants.USER.ADD_USER_STORE,
  payload: { user },
});

export const updateUserProfileToStore = (updatePayload) => ({
  type: constants.USER.UPDATE_USER_STORE,
  payload: { updatePayload },
});
