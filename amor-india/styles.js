import { StyleSheet, Dimensions, Platform } from "react-native";
const width = Dimensions.get("window").width;
import { normalize } from "./helper";
export default StyleSheet.create({
  mainText: { fontSize: normalize(50), color: "white", fontWeight: "200" },
  mainTextContainer: {
    flex: 1,
    alignSelf: "flex-start",
    marginTop: Platform.OS === "android" ? 80 : 70,
    marginLeft: 40
  }
});
