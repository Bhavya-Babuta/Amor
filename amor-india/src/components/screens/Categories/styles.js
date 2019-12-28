import { StyleSheet, Dimensions, Platform } from "react-native";
const width = Dimensions.get("window").width;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : -STATUSBAR_HEIGHT,
    backgroundColor: "#ffffff"
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  }
});
