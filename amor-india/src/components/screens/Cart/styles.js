import { StyleSheet, Platform, StatusBar } from "react-native";
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : -STATUSBAR_HEIGHT,
    backgroundColor: "#D0E0DD"
  },
  cartList: { marginLeft: 10, flex: 3, marginTop: 10 },
  summary: { flex: 2, margin: 30, borderRadius: 10, backgroundColor: "#ffffff" }
});
