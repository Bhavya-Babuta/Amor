import React from "react";
import { Button } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Profile from "../../../screens/Profile";
import Home from "../../../screens/Home";
import ManageAddress from "../../../screens/ManageAddress";
import AddNewAddress from "../../../screens/AddNewAddress";

const ProfileStack = createStackNavigator(
  {
    Home: { screen: Home },
    Profile: { screen: Profile },
    ManageAddress: { screen: ManageAddress },
    AddNewAddress: { screen: AddNewAddress },
  },
  {
    headerMode: "none",
    initialRouteName: "Profile",
  }
);

export default createAppContainer(ProfileStack);
