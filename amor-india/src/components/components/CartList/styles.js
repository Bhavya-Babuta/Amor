import { StyleSheet, Dimensions, Platform } from "react-native";
const width = Dimensions.get("window").width;

import { normalize } from "../../../../helper";
export default StyleSheet.create({
  listItem: {
    backgroundColor: "#fff",
    borderRadius: 4,
    width: 175,
    marginRight: 15,
  },
  image: {
    alignSelf: "center",
    width: "100%",
    height: "100%",
  },
  productName: { fontSize: normalize(10), alignSelf: "center" },
  updateStack: {
    flexDirection: "row",
    alignSelf: "center",
    borderWidth: 0.5,
    borderColor: "#CDCDCD",
    borderRadius: 5,
  },
  updateButton: {
    width: "15%",
    backgroundColor: "powderblue",
  },
  quantityText: {
    alignSelf: "center",
    fontSize: normalize(10),
    fontWeight: "500",
    paddingLeft: 30,
    paddingRight: 30,
    fontWeight: "300",
  },
  updateButtonText: {
    fontSize: normalize(15),
    alignSelf: "center",
    marginTop: "1.5%",
    fontWeight: "100",
  },
});
