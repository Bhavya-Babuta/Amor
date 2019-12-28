import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Home from "../../../../screens/Home";

const Homes = createStackNavigator(
  {
    Home: { screen: Home }
  },
  {
    headerMode: "none"
  }
);

const HomeStack = createAppContainer(Homes);
export default HomeStack;
