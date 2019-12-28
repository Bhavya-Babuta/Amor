import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import HomeStack from "./HomeStack";
import Account from "../../../screens/Account";
import AboutUs from "../../../screens/AboutUs";
import ContactUs from "../../../screens/ContactUs";
import Feedback from "../../../screens/Feedback";
import React from "react";
import { SafeAreaView, View, ScrollView, Image, Text } from "react-native";
import { DrawerItems } from "react-navigation-drawer";
import { Dimensions, Platform } from "react-native";
const width = Dimensions.get("window").width;
import Icon from "react-native-vector-icons/FontAwesome";

const SideDrawer = createDrawerNavigator(
  {
    Home: { screen: HomeStack },
    "My Orders": { screen: Account },
    "Returns/Refund": { screen: Account },
    Feedback: { screen: Feedback },
    "About Amor": { screen: AboutUs },
    "Contact Us": { screen: ContactUs },
    "Terms and Conditions": { screen: Account }
  },
  {
    drawerType: "slide",
    navigationOptions: ({ navigation }) => {
      drawerIcon: ({ tintColor }) => <Icon name="md-menu" size={30} />;
    },
    contentComponent: props => (
      <SafeAreaView
        style={{
          alignItems: "left",
          marginTop: Platform.OS === "android" ? 30 : 0,
          flex: 1
        }}
      >
        <View
          style={{
            height: 140,
            alignItems: "center",
            justifyContent: "center",
            width: "100%"
          }}
        >
          <Image
            source={require("../../../../../assets/images/amorbranding-white.jpg")}
            style={{ resizeMode: "cover", height: 140, width: "100%" }}
          ></Image>
        </View>
        <ScrollView style={{ width: width / 2 + width / 5.5 }}>
          <DrawerItems
            style={{ alignItems: "left", justifyContent: "left", fontSize: 35 }}
            {...props}
          />
        </ScrollView>
      </SafeAreaView>
    )
  }
);

export default createAppContainer(SideDrawer);
