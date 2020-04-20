import { StyleSheet, Platform, Dimensions, StatusBar } from "react-native";
const WIDTH = Dimensions.get("window").width;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
import { normalize } from "../../../../helper";

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 0 : -STATUSBAR_HEIGHT,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderBottomColor: "#CDCDCD",
    borderBottomWidth: 0.5,
  },
  icon: { paddingLeft: 10 },
  background: {
    resizeMode: "cover",
    overflow: "hidden",
    width: WIDTH * 0.85,
    maxHeight: 50,
  },
});
