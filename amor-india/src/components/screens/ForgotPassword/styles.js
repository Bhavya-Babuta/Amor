import { StyleSheet, Platform, Dimensions } from "react-native";
const width = Dimensions.get("window").width;
import { normalize } from "../../../../helper";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: Platform.OS === "android" ? 0 : 0,
    backgroundColor: "#000000",
  },
  inputView: {
    marginTop: 50,
  },
  email: {
    backgroundColor: "#ffffff",
    width: width * 0.8,
    padding: Platform.zOS === "android" ? 8 : 15,
    borderWidth: 0.5,
    borderRadius: 5,
  },
  buttonView: {
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
  },
  button: {
    width: width * 0.8,
    backgroundColor: "#000000",
    padding: 10,
    borderRadius: 7,
    borderColor: "#ffffff",
    borderWidth: 2,
  },
  buttonText: {
    textAlign: "center",
    fontSize: normalize(15),
    color: "#ffffff",
  },
});
