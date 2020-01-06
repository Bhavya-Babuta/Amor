import { StyleSheet, Platform, Dimensions, StatusBar } from "react-native";
const WIDTH = Dimensions.get("window").width;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
import { normalize } from "../../../../helper";
export default StyleSheet.create({
  itemContainer: {
    width: WIDTH / 2.5,
    borderWidth: 3,
    borderRadius: 2,
    borderColor: "black",
    margin: 15,
    marginLeft: 23
  },
  item: {
    flex: 1,
    backgroundColor: "lightblue"
  },
  indicatorView: { flex: 1, justifyContent: "center", alignItems: "center" },
  indicatorText: { fontSize: 20 },
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 0 : -STATUSBAR_HEIGHT,
    backgroundColor: "#ffffff"
  },
  wrapper: { height: 210 },
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB"
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5"
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9"
  },
  image: {
    width: "100%",
    height: 220,
    resizeMode: "cover"
  },
  header: {
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderBottomColor: "#CDCDCD",
    borderBottomWidth: 0.5
  },
  icon: { paddingLeft: 10 },
  background: {
    resizeMode: "cover",
    overflow: "hidden",
    width: WIDTH * 0.85,
    maxHeight: 50
  },
  headerText: {
    fontSize: 30,
    marginLeft: WIDTH / 2 - 70
  },
  topText: {
    fontSize: normalize(20),
    marginTop: 20,
    marginLeft: 10,
    fontWeight: "300",
    marginBottom: 15
  },
  highlightedProductsFlatlist: {},
  highlightedProductsFlatlistColumnWrapper: {
    flex: 1,
    width: WIDTH / 2 - 40,
    marginLeft: 10
  },
  highlightedProducts: {
    backgroundColor: "#ffffff",
    borderWidth: 0.5,
    borderColor: "#D3D3D3",
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    margin: 13
  },
  highlightedProductsImage: {
    height: WIDTH / 1.7,
    width: WIDTH / 2.5
  },
  highlightedProductsName: { textAlign: "center", fontSize: 20 },
  featuredProductsScrollHorizontal: { flexDirection: "row" },
  scrollArrow: { marginRight: 5, marginLeft: 10, alignSelf: "center" },
  ProductsHorizontalFlatlist: {
    marginLeft: 10,
    paddingTop: 20,
    paddingRight: 25
  },
  horizontalProductListImage: { height: 150, width: 70 },
  horizontalProductListName: { textAlign: "center", fontSize: 15 },
  nameText: {
    alignSelf: "center",
    marginTop: "8%",
    fontSize: normalize(10),
    fontWeight: "500"
  },
  priceText: {
    alignSelf: "center",
    marginTop: "8%",
    fontSize: normalize(10),
    fontWeight: "500"
  }
});
