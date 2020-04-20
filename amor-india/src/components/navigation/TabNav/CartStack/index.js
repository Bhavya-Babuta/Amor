import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Cart from "../../../screens/Cart";
import ManageAddress from "../../../screens/ManageAddress";
import Payment from "../../../screens/Payment";
import AddNewAddress from "../../../screens/AddNewAddress";

const CartStack = createStackNavigator(
  {
    Cart: { screen: Cart },
    ManageAddress: { screen: ManageAddress },
    Payment: { screen: Payment },
    AddNewAddress: { screen: AddNewAddress },
  },
  {
    headerMode: "none",
    initialRouteName: "Cart",
  }
);

export default createAppContainer(CartStack);
