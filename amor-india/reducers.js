import { combineReducers } from "redux";
import cartReducer from "./src/components/screens/Cart/reducer";
import userReducer from "./src/components/screens/Login/reducer";

export default combineReducers({
  cart: cartReducer,
  user: userReducer,
});
