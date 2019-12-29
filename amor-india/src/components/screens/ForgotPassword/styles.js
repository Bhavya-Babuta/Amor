import { StyleSheet, Platform, Dimensions } from "react-native";
const width = Dimensions.get("window").width;

export default StyleSheet.create({
  background: {
    height: null,
    width: width * 2,
    resizeMode: "cover",
    overflow: "hidden",
    flex: 2.5
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: Platform.OS === "android" ? 0 : 0,
    backgroundColor: "#000000"
  },
  logo: {
    marginTop: 50,
    width: 150,
    height: 150
  },
  inputView: {
    flex: 2.5
  },
  email: {
    backgroundColor: "#ffffff",
    width: width * 0.8,
    padding: Platform.OS === "android" ? 8 : 15,
    borderWidth: 0.5,
    marginBottom: 15,
    borderRadius: 5
  },
  buttonView: {
    flex: 2,
    justifyContent: "space-between",
    alignItems: "center"
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
    fontSize: 20,
    color: "#ffffff"
  }
});
