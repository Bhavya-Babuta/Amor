import { StyleSheet, Dimensions, Platform, StatusBar } from "react-native";
const width = Dimensions.get("window").width;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 0 : -STATUSBAR_HEIGHT,
    backgroundColor: "#ffffff"
  },
  buttons: {
    flex: 3,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30
  },
  headerContent: {
    marginTop: 25,
    alignItems: "center"
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 5
  },
  name: {
    fontSize: 22,
    color: "#000000",
    fontWeight: "600"
  },
  userInfo: {
    fontSize: 16,
    color: "#778899",
    fontWeight: "600"
  },
  textField: {
    backgroundColor: "#ffffff",
    width: width * 0.8,
    padding: 13,
    borderWidth: 0.5,
    marginTop: 2,
    marginBottom: 15,
    borderRadius: 5,
    fontFamily: "AvenirNext-Medium",
    fontSize: 20
  },
  saveButton: {
    borderWidth: 2,
    borderColor: "black",
    width: "40%",
    alignSelf: "center"
  }
});
