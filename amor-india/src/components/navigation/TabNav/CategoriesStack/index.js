import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Categories from "../../../screens/Categories";
import ProductPage from "../../../screens/ProductPage";
import ProductList from "../../../screens/ProductList";

const Category = createStackNavigator(
  {
    Categories: { screen: Categories },
    ProductPage: { screen: ProductPage },
    ProductList: { screen: ProductList }
  },
  {
    headerMode: "none",
    initialRouteName: "Categories"
  }
);

const CategoriesStack = createAppContainer(Category);
export default CategoriesStack;
