import { StyleSheet, Platform, Dimensions, StatusBar } from "react-native";
const WIDTH = Dimensions.get("window").width;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
import { normalize } from "../../../../helper";

export default StyleSheet.create({});
