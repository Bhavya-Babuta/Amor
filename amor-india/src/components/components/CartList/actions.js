import { constants } from "../../../../constants";

export const updateProductCartQuantity = (productId, selectedSize, task) => ({
  type: constants.CART.UPDATE_PRODUCT_CART_QUANTITY,
  payload: { productId, selectedSize, task },
});

export const clearCart = () => ({
  type: constants.CART.CLEAR_CART,
});
