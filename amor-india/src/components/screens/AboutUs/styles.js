import { StyleSheet, Dimensions, Platform, StatusBar } from "react-native";
const WIDTH = Dimensions.get("window").width;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
import { normalize } from "../../../../helper";

export default StyleSheet.create({
  header: {
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderBottomColor: "#CDCDCD",
    borderBottomWidth: 0.5,
  },
  icon: { paddingLeft: 10 },

  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 0 : -STATUSBAR_HEIGHT,
    backgroundColor: "#ffffff",
  },
  background: {
    resizeMode: "cover",
    overflow: "hidden",
    width: WIDTH * 0.85,
    maxHeight: 50,
  },
  aboutUsMessage: {
    fontSize: normalize(13),
    marginTop: 10,
    alignSelf: "center",
    textAlign: "justify",
    width: WIDTH * 0.9,
  },
});
