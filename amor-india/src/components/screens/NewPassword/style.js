import { StyleSheet, Dimensions, Platform } from "react-native";
const width = Dimensions.get("window").width;
export default {
  background: {
    height: null,
    width: width,
    resizeMode: "cover",
    overflow: "hidden",
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: Platform.OS === "android" ? 30 : 0
    // flexDirection: "column"
  },
  inputView: {
    flex: 1.5
  },
  imageView: {
    flex: 2.5,
    marginTop: 20,
    alignItems: "center"
  },
  logo: {
    width: 150,
    height: 150
  },
  password: {
    backgroundColor: "#ffffff",
    width: width * 0.8,
    padding: 10,
    borderWidth: 0.5
    // opacity:0.3
  },
  confirmPassword: {
    marginTop: 10
  },
  buttons: {
    flex: 3,
    justifyContent: "space-between",
    alignItems: "center"
  },
  loginButton: {
    width: width * 0.8,
    backgroundColor: "#5fd5f5",
    padding: 10
  },
  loginButtonText: { textAlign: "center", fontSize: 20 },
  description: {
    fontSize: 40,
    textAlign: "center",
    color: "white"
  }
};
