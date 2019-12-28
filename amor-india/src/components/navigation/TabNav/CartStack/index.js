import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Cart from "../../../screens/Cart";

const CartStack = createStackNavigator(
  {
    Cart: { screen: Cart }
  },
  {
    headerMode: "screen",
    initialRouteName: "Cart"
  }
);

export default createAppContainer(CartStack);
