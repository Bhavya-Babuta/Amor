import { StyleSheet, Dimensions, Platform, StatusBar } from "react-native";
const WIDTH = Dimensions.get("window").width;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
const HEIGHT = Dimensions.get("window").width;

export default StyleSheet.create({
  header: {
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderBottomColor: "#CDCDCD",
    borderBottomWidth: 0.5
  },
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 0 : -STATUSBAR_HEIGHT,
    backgroundColor: "#ffffff"
  },
  icon: { paddingLeft: 10 },
  background: {
    resizeMode: "cover",
    overflow: "hidden",
    width: WIDTH * 0.85,
    maxHeight: 50
  },
  inputField: {
    backgroundColor: "#ffffff",
    width: WIDTH,
    height: HEIGHT * 0.7,
    padding: 15,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: "#CDCDCD",
    marginTop: 20
  },
  inputFieldMargin: {
    marginBottom: 15
  }
});
