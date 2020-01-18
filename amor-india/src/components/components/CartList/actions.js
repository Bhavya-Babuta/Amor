import { constants } from "../../../../constants";

export const updateProductCartQuantity = (productId, task) => {
  console.log("Reached Actions");
  console.log("Product Id: ", productId);
  console.log("Task: ", task);
  return {
    type: constants.CART.UPDATE_PRODUCT_CART_QUANTITY,
    payload: { productId, task }
  };
};
