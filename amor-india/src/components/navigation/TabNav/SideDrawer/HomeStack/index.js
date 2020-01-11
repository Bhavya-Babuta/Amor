import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Home from "../../../../screens/Home";
import ProductPageHome from "../../../../screens/ProductPage";

const Homes = createStackNavigator(
  {
    Home: { screen: Home },
    ProductPageHome: { screen: ProductPageHome }
  },
  {
    headerMode: "none"
  }
);

const HomeStack = createAppContainer(Homes);
export default HomeStack;
