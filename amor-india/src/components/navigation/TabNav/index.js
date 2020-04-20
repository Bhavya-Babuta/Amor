import React from "react";
import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import SideDrawer from "./SideDrawer";
import CategoriesStack from "./CategoriesStack";
import CartStack from "./CartStack";
import ProfileStack from "./ProfileStack";

const Tab = createMaterialBottomTabNavigator(
  {
    Home: { screen: SideDrawer },
    Categories: { screen: CategoriesStack },
    Profile: { screen: ProfileStack },
    Cart: { screen: CartStack },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, vertical, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === "Home") {
          iconName = `ios-home`;
        } else if (routeName === "Categories") {
          iconName = `ios-apps`;
        } else if (routeName === "Cart") {
          iconName = `ios-cart`;
        } else if (routeName === "Profile") {
          iconName = `ios-person`;
        }
        return (
          <IconComponent
            name={iconName}
            style={{ color: tintColor }}
            size={25}
          />
        );
      },
    }),
    tabBarOnPress: ({ navigation, defaultHandler }) => {
      defaultHandler();
    },

    initialRouteName: "Home",
    shifting: false,
    activeColor: "pink",
    inactiveColor: "white",
    barStyle: { backgroundColor: "#253037" },
    backBehavior: "order",
    lazy: false,
  }
);

const TabNav = createAppContainer(Tab);
export default TabNav;
