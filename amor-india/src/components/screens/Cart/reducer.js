import { constants } from "../../../../constants";

const initialState = {
  currentValue: [
    {
      id: 1,
      name: "Apparel 1",
      img: require(`../../../../assets/images/temp/FormalCasualShirts/edited.jpg`),
      price: 300,
      quantity: 1
    },
    {
      id: 2,
      name: "Apparel 2",
      img: require(`../../../../assets/images/temp/JumpsuitPlaysuit/edited43.jpg`),
      quantity: 1,
      price: 210
    },
    {
      id: 3,
      name: "Apparel 3",
      img: require(`../../../../assets/images/temp/LongDresses/edited56.jpg`),
      quantity: 1,
      price: 290
    },
    {
      id: 4,
      name: "Apparel 4",
      img: require(`../../../../assets/images/temp/Tops/edited7.jpg`),
      quantity: 1,
      price: 240
    },
    {
      id: 5,
      name: "Apparel 5",
      img: require(`../../../../assets/images/temp/TwoPieceDresses/edited58.jpg`),
      quantity: 1,
      price: 290
    },
    {
      id: 6,
      name: "Apparel 6",
      img: require(`../../../../assets/images/temp/LongDresses/3.jpg`),
      quantity: 1,
      price: 300
    }
  ],
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
      newState.currentValue.push(action.addToCart);
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
