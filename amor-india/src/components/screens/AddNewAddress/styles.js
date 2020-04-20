import { StyleSheet, Dimensions, Platform, StatusBar } from "react-native";
const width = Dimensions.get("window").width;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
import { normalize } from "../../../../helper";

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 0 : -STATUSBAR_HEIGHT,
    backgroundColor: "#ffffff",
  },
  mapStyle: {
    width: width,
    height: Dimensions.get("window").height / 4,
  },
  textInput: {
    backgroundColor: "white",
    color: "black",
    width: width * 0.85,
    padding: Platform.OS === "android" ? 8 : 14,
    borderWidth: 0.5,
    marginBottom: 15,
    borderRadius: 5,
    fontFamily: "AvenirNext-Medium",
    fontSize: normalize(10),
  },
  proceedButton: {
    alignSelf: "center",
    borderColor: "black",
    borderWidth: 2,
    width: "85%",
    alignItems: "center",
    paddingBottom: 12,
    paddingTop: 12,
  },
  proceedText: {
    fontSize: normalize(12),
  },
});
