import { StyleSheet, Platform, StatusBar } from "react-native";
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
import { normalize } from "../../../../helper";

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 0 : -STATUSBAR_HEIGHT,
    backgroundColor: "#D0E0DD"
  },
  cartList: { marginLeft: 10, flex: 3, marginTop: 10 },
  summary: { flex: 2, margin: 25, borderRadius: 10 }
});
