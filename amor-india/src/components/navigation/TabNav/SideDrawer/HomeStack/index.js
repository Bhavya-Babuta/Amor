import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Home from "../../../../screens/Home";
import ProductPage from "../../../../screens/ProductPage";
import ProductList from "../../../../screens/ProductList";
import Loader from "../../../../screens/Loader";

const HomeStack = createStackNavigator(
  {
    Home: { screen: Home },
    ProductListHome: { screen: ProductList },
    ProductPageHome: { screen: ProductPage },
    Loader: { screen: Loader },
  },
  {
    headerMode: "none",
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarVisible: () => {
        const { routeName } = navigation.state;
        return routeName === "Loader" ? false : true;
      },
    }),
  }
);

export default createAppContainer(HomeStack);
