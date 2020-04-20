import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Categories from "../../../screens/Categories";
import ProductPage from "../../../screens/ProductPage";
import ProductList from "../../../screens/ProductList";
import Filters from "../../../screens/Filters";

const Category = createStackNavigator(
  {
    Categories: { screen: Categories },
    ProductPage: { screen: ProductPage },
    ProductList: { screen: ProductList },
    Filters: { screen: Filters },
  },
  {
    headerMode: "none",
    initialRouteName: "Categories",
  }
);

export default createAppContainer(Category);
