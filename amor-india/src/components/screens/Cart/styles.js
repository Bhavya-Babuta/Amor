import { StyleSheet, Platform, StatusBar, Dimensions } from "react-native";
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
import { normalize } from "../../../../helper";
const WIDTH = Dimensions.get("window").width;

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 0 : -STATUSBAR_HEIGHT,
    backgroundColor: "#D0E0DD"
  },
  cartList: { marginLeft: 10, flex: 5, marginTop: 20 },
  summary: {
    flex: 3,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
    borderRadius: 10,
    marginTop: 10
  },
  proceedButton: {
    alignSelf: "center",
    borderColor: "black",
    borderWidth: 2,
    width: "95%",
    alignItems: "center",
    paddingBottom: 13,
    paddingTop: 13
  },
  proceedText: {
    fontSize: normalize(12)
  }
});
