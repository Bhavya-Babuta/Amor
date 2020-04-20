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
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: Platform.OS === "android" ? 0 : 0,
    backgroundColor: "#000000",
  },
  inputView: {
    flex: 1,
    marginTop: 20,
  },
  inputViewKeyboard: { flex: 4 },
  inputField: {
    backgroundColor: "#ffffff",
    width: width * 0.8,
    padding: Platform.OS === "android" ? 8 : 15,
    borderWidth: 0.5,
    marginBottom: 15,
    borderRadius: 5,
  },
  buttonView: {
    justifyContent: "flex-start",
    alignItems: "center",
    textDecorationLine: "underline",
    marginTop: 10,
  },
  button: {
    width: width * 0.6,
    backgroundColor: "#000000",
    padding: 10,
    borderRadius: 5,
    borderColor: "#ffffff",
    borderWidth: 2,
  },
  buttonText: {
    textAlign: "center",
    fontSize: normalize(15),
    color: "#ffffff",
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: "#ffffff",
    fontSize: normalize(15),
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
  resendConfirmationCode: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#ffffff",
    fontSize: normalize(16),
  },
  resendConfirmationCodeButton: {
    marginTop: 70,
  },
  mainText: defaultStyles.mainText,
  mainTextContainer: defaultStyles.mainTextContainer,
  mainTextContainerMargin: defaultStyles.mainTextContainerMargin,
  mainTextContainerMarginKeyBoard: {
    marginTop: Platform.OS === "android" ? 40 : 0,
    flex: Platform.OS === "android" ? 0.8 : 0.5,
  },
});
