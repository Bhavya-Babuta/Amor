import { constants } from "../../../../constants";

const initialState = {
  currentValue: [],
  error: null,
};

function cartReducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case constants.CART.ADD_TO_CART:
      newState.currentValue.push(action.payload.product);
      return newState;
    case constants.CART.DELETE_FROM_CART:
      newState.currentValue = currentValue.filter((element) => {
        return element.id !== action.cartItem.productId;
      });
      return newState;
    case constants.CART.CLEAR_CART:
      return {
        currentValue: [],
        error: null,
      };
    case constants.CART.UPDATE_PRODUCT_CART_QUANTITY:
      const updateIndex = newState.currentValue.findIndex(
        (element) =>
          element.id === action.payload.productId &&
          element.selectedSize === action.payload.selectedSize
      );
      if (action.payload.task === constants.TASKS.DECREMENT) {
        if (newState.currentValue[updateIndex].quantity === 1) {
          newState.currentValue.splice(updateIndex, 1);
        } else {
          newState.currentValue[updateIndex].quantity -= 1;
        }
        return newState;
      }
      if (action.payload.task === constants.TASKS.INCREMENT) {
        if (newState.currentValue[updateIndex].quantity === 10) {
          newState.error = "Maximum quantity reached";
        } else {
          newState.currentValue[updateIndex].quantity += 1;
        }
        return newState;
      }
      return newState;
    default:
      return state;
  }
}

export default cartReducer;
