import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";
import GeneralStatusBarColor from "../../components/GeneralStatusBarColor/GeneralStatusBarColor";
import { Platform, Dimensions, StatusBar } from "react-native";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
import { normalize } from "../../../../helper";

class ProductPage extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <GeneralStatusBarColor
          backgroundColor="#253037"
          barStyle="light-content"
        />
        <ScrollView
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[1]}
        >
          <View style={styles.header}>
            <Image
              source={require("../../../../assets/images/amorbranding-white.jpg")}
              style={styles.background}
            ></Image>
          </View>
          <View style={styles.productContainer}>
            <View style={styles.productImageContainer}>
              <Image
                source={require("../../../../assets/images/temp/TwoPieceDresses/11.jpg")}
                style={styles.productImageFull}
                resizeMethod="scale"
              ></Image>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
export default ProductPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 0 : -STATUSBAR_HEIGHT,
    backgroundColor: "#ffffff"
  },
  header: {
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderBottomColor: "#CDCDCD",
    borderBottomWidth: 0.5,
    alignSelf: "center"
  },
  background: {
    resizeMode: "cover",
    overflow: "hidden",
    width: WIDTH * 0.85,
    maxHeight: 50
  },
  productImageFull: {
    width: WIDTH * 0.7,
    height: HEIGHT * 0.6,
    alignSelf: "center"
  },
  productImageContainer: {
    alignSelf: "center",
    marginTop: 20
  },
  productContainer: {
    flex: 1
  }
});
