import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Home from "../../../../screens/Home";
import ProductPage from "../../../../screens/ProductPage";
import ProductList from "../../../../screens/ProductList";

const Homes = createStackNavigator(
  {
    Home: { screen: Home },
    ProductListHome: { screen: ProductList },
    ProductPageHome: { screen: ProductPage }
  },
  {
    headerMode: "none"
  }
);

const HomeStack = createAppContainer(Homes);
export default HomeStack;
