import { StyleSheet, Dimensions, Platform } from "react-native";
const width = Dimensions.get("window").width;
import { normalize } from "./helper";

export default StyleSheet.create({
  mainText: { fontSize: normalize(50), color: "white", fontWeight: "200" },
  mainTextContainer: {
    alignSelf: "flex-start",
  },
  mainTextContainerMargin: {
    marginTop: Platform.OS === "android" ? 70 : 60,
  },
});
