import { combineReducers } from "redux";
import cartReducer from "./src/components/screens/Cart/reducer";

export default combineReducers({
  cart: cartReducer
});
