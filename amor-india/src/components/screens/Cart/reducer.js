import { constants } from "../../../../constants";

const data = [];

const initialState = {
  currentValue: [],
  error: null
};

function removeByKey(array, params) {
  array.some(function(item, index) {
    return array[index][params.key] === params.value
      ? !!array.splice(index, 1)
      : false;
  });
  return array;
}

function cartReducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  console.log("Intial State: ", newState);
  switch (action.type) {
    case constants.CART.ADD_TO_CART:
      newState.currentValue.push(action.payload.product);
      return newState;
    case constants.CART.DELETE_FROM_CART:
      newState.currentValue = currentValue.filter(element => {
        return element.id !== action.cartItem.productId;
      });
    case constants.CART.UPDATE_PRODUCT_CART_QUANTITY:
      console.log();
      const updateIndex = newState.currentValue.findIndex(
        element => element.id === action.payload.productId
      );
      console.log("Update Index: ", updateIndex);
      if (action.payload.task === constants.TASKS.DECREMENT) {
        console.log("Decrement Task");
        if (newState.currentValue[updateIndex].quantity === 1) {
          console.log("Remove the product since quantity has reached 0");
          newState.currentValue.splice(updateIndex, 1);
        } else {
          console.log("Decremeting value by 1");
          newState.currentValue[updateIndex].quantity -= 1;
        }
        console.log("Final State: ", newState);
        return newState;
      }
      if (action.payload.task === constants.TASKS.INCREMENT) {
        console.log("Incrementß Task");
        if (newState.currentValue[updateIndex].quantity === 10) {
          newState.error = "Maximum quantity reached";
        } else {
          console.log("Incrementing value by 1");
          newState.currentValue[updateIndex].quantity += 1;
        }
        console.log("Final State: ", newState);
        return newState;
      }
      return newState;
    default:
      return state;
  }
}

export default cartReducer;
