import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
  Image
} from "react-native";
import SearchBarComponent from "../../screens/SearchBarComponent";
import GeneralStatusBarColor from "../../components/GeneralStatusBarColor/GeneralStatusBarColor";
const width = Dimensions.get("window").width;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;

const height = Dimensions.get("window").height;
const data = [
  {
    id: 1,
    name: "Product A",
    img: require("../../../../assets/images/temp/FormalCasualShirts/edited.jpg")
  },
  {
    id: 1,
    name: "Product A",
    img: require("../../../../assets/images/temp/FormalCasualShirts/edited.jpg")
  },
  {
    id: 1,
    name: "Product A",
    img: require("../../../../assets/images/temp/FormalCasualShirts/edited.jpg")
  },
  {
    id: 1,
    name: "Product A",
    img: require("../../../../assets/images/temp/FormalCasualShirts/edited.jpg")
  },
  {
    id: 1,
    name: "Product A",
    img: require("../../../../assets/images/temp/FormalCasualShirts/edited.jpg")
  },
  {
    id: 1,
    name: "Product A",
    img: require("../../../../assets/images/temp/FormalCasualShirts/edited.jpg")
  },
  {
    id: 1,
    name: "Product A",
    img: require("../../../../assets/images/temp/FormalCasualShirts/edited.jpg")
  },
  {
    id: 1,
    name: "Product A",
    img: require("../../../../assets/images/temp/FormalCasualShirts/edited.jpg")
  },
  {
    id: 1,
    name: "Product A",
    img: require("../../../../assets/images/temp/FormalCasualShirts/edited.jpg")
  },
  {
    id: 1,
    name: "Product A",
    img: require("../../../../assets/images/temp/FormalCasualShirts/edited.jpg")
  },
  {
    id: 1,
    name: "Product A",
    img: require("../../../../assets/images/temp/FormalCasualShirts/edited.jpg")
  }
];
class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: null
    };
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <GeneralStatusBarColor
          backgroundColor="#253037"
          barStyle="light-content"
        />
        <SearchBarComponent />
        <View>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.productContainer}>
                <View>
                  <Image source={item.img} style={{ width }}></Image>
                </View>
                <Text>{item.name}</Text>
              </View>
            )}
          ></FlatList>
        </View>
      </SafeAreaView>
    );
  }
}
export default ProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : -STATUSBAR_HEIGHT,
    backgroundColor: "#ffffff"
  },
  productContainer: {
    height: height * 0.25,
    alignSelf: "center",
    borderWidth: 4,
    width,
    alignContent: "center"
  }
});
