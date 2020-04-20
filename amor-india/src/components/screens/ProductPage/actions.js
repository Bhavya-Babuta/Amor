import { constants } from "../../../../constants";

export const addProductToCart = product => ({
  type: constants.CART.ADD_TO_CART,
  payload: { product }
});
