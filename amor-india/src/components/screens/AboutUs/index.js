import React, { Component } from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import GeneralStatusBarColor from "../../components/GeneralStatusBarColor/GeneralStatusBarColor";

class AboutUs extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <GeneralStatusBarColor
          backgroundColor="#253037"
          barStyle="light-content"
        />
        <View style={styles.header}>
          <Icon
            name="md-menu"
            size={30}
            style={styles.icon}
            onPress={() => this.props.navigation.openDrawer()}
          />
          <Image
            source={require("../../../../assets/images/amorbranding-white.jpg")}
            style={styles.background}
          ></Image>
        </View>
        <View style={{ width: "100%" }}>
          <Text style={{ fontSize: 30, marginTop: 20, alignSelf: "center" }}>
            About Us
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.aboutUsMessage}>
            Amor, a state-of-the-art company, is a new creation that aims to
            make 2020 the year that sees fashion with a completely new
            perspective.It offers a wide range of outfits designed for women
            that adds to their panache. Amor is an epitome of grandeur, a brand
            that will set new standards in clothing with its exclusive chic
            apparel. It offers a progressive, flamboyant collection of clothes
            with appealing designs and quality that won't disappoint. So, buckle
            up, all fashion afficianados, it's time to modernise your wardrobe
            with Amor.
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}
export default AboutUs;
