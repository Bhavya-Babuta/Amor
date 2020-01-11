import React from "react";
import { Button } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Profile from "../../../screens/Profile";
import Home from "../../../screens/Home";
import AddressList from "../../../screens/AddressList";

const ProfileStack = createStackNavigator(
  {
    Home: { screen: Home },
    Profile: {
      screen: Profile
      // navigationOptions: {
      //   headerStyle: {
      //     backgroundColor: "#DCDCDC"
      //   },
      //   headerLeft: () => (
      //     <Button
      //       title="Back"
      //       icon={<Icon name="arrow-left" size={20} color="#000000" />}
      //       buttonStyle={{ backgroundColor: "#DCDCDC" }}
      //       onPress={() => {
      //         const { navigation } = this.props;
      //         navigation.goBack(null);
      //       }}
      //     />
      //   )
      // }
    },
    AddressList: { screen: AddressList }
  },
  {
    headerMode: "none",
    initialRouteName: "Profile"
  }
);

export default createAppContainer(ProfileStack);
