import { StyleSheet, Platform, Dimensions } from "react-native";
const width = Dimensions.get("window").width;
import defaultStyles from "../../../../styles";
import { normalize } from "../../../../helper";

export default StyleSheet.create({
  background: {
    height: null,
    width: width * 2.0,
    resizeMode: "cover",
    overflow: "hidden",
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: Platform.OS === "android" ? 0 : 0,
    backgroundColor: "#000000"
  },
  inputView: {
    flex: 5
  },
  inputField: {
    backgroundColor: "#ffffff",
    width: width * 0.8,
    padding: Platform.OS === "android" ? 8 : 15,
    borderWidth: 0.5,
    marginBottom: 15,
    borderRadius: 5
  },
  buttonView: {
    flex: 3,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 40,
    textDecorationLine: "underline"
  },
  button: {
    width: width * 0.8,
    backgroundColor: "#000000",
    padding: 10,
    borderRadius: 7,
    borderColor: "#ffffff",
    borderWidth: 2
  },
  buttonText: {
    textAlign: "center",
    fontSize: normalize(20),
    color: "#ffffff"
  },
  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6"
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: "#ffffff",
    fontSize: 20
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6"
  },
  resendConfirmationCode: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#ffffff",
    fontSize: 17
  },
  resendConfirmationCodeButton: {
    marginTop: 70
  },
  mainText: defaultStyles.mainText,
  mainTextContainer: defaultStyles.mainTextContainer
});
