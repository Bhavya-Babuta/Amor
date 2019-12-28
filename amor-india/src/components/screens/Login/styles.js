import { StyleSheet, Dimensions, Platform } from "react-native";
const width = Dimensions.get("window").width;

export default StyleSheet.create({
  background: {
    height: null,
    width: width * 2.0,
    resizeMode: "cover",
    overflow: "hidden",
    flex: 2.5
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: Platform.OS === "android" ? 30 : 0,
    backgroundColor: "#000000"
  },
  logo: {
    width: 150,
    height: 150
  },
  inputView: {
    flex: 7
  },
  email: {
    backgroundColor: "white",
    width: width * 0.8,
    padding: 15,
    borderWidth: 0.5,
    marginBottom: 20,
    borderRadius: 5,
    fontFamily: "AvenirNext-Medium",
    fontSize: 15
  },
  password: {
    backgroundColor: "white",
    width: width * 0.8,
    padding: 15,
    borderWidth: 0.5,
    borderRadius: 5,
    // opacity:0.3,
    fontFamily: "AvenirNext-Medium",
    fontSize: 15
  },
  buttons: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center"
  },
  // signup: {
  //   flex: 1,
  //   justifyContent: "space-between",
  //   alignItems: "center"
  // },
  loginButton: {
    width: width * 0.6,
    backgroundColor: "#000000",
    padding: 10,
    borderRadius: 5,
    borderColor: "#ffffff",
    borderWidth: 2
  },
  loginButtonText: {
    textAlign: "center",
    fontSize: 20,
    color: "#ffffff"
  },
  forgotPasswordButton: {
    marginTop: 20,
    marginBottom: 25
  },
  forgotPasswordButtonText: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 20,
    fontFamily: "AvenirNext-Medium",
    fontWeight: "300"
  },
  newAccountButton: {
    width: width * 0.6,
    backgroundColor: "#000000",
    // padding: 10,
    marginTop: 30
  },
  newAccountButtonText: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 18,
    textDecorationColor: "white"
  }
});
