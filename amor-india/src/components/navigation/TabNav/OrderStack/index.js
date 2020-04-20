import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Orders from "../../../screens/Orders";
import Order from "../../../screens/Order";

const OrderStack = createStackNavigator(
  {
    Orders: { screen: Orders },
    Order: { screen: Order },
  },
  {
    headerMode: "none",
    initialRouteName: "Orders",
  }
);

export default createAppContainer(OrderStack);
