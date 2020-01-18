import { constants } from "../../../../constants";

export const addProductToCart = product => {
  console.log("Adding to product: ", product);
  return {
    type: constants.CART.ADD_TO_CART,
    payload: { product }
  };
};
