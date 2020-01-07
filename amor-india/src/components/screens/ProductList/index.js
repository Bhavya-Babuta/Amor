import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
  Image,
  Button,
  Platform,
  StatusBar
} from "react-native";
import SearchBarComponent from "../../screens/SearchBarComponent";
import GeneralStatusBarColor from "../../components/GeneralStatusBarColor/GeneralStatusBarColor";
import { TouchableOpacity } from "react-native-gesture-handler";
const { normalize } = require("../../../../helper");

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;

const data = [
  {
    id: 1,
    product_name: "Product A",
    img: require("../../../../assets/images/temp/LongDresses/3.jpg"),
    product_color: "Black",
    price: 240,
    availableSizes: ["S", "M", "L"]
  },
  {
    id: 2,
    product_name: "Product A",
    img: require("../../../../assets/images/temp/FormalCasualShirts/edited35.jpg"),
    product_color: "Black",
    price: 330,
    availableSizes: ["S", "M", "L"]
  },
  {
    id: 3,
    product_name: "Product A",
    img: require("../../../../assets/images/temp/FormalCasualShirts/edited44.jpg"),
    product_color: "Black",
    price: 242,
    availableSizes: ["S", "M", "L"]
  },
  {
    id: 4,
    product_name: "Product A",
    img: require("../../../../assets/images/temp/FormalCasualShirts/edited74.jpg"),
    product_color: "Black",
    price: 100,
    availableSizes: ["S", "M", "L"]
  },
  {
    id: 5,
    product_name: "Product A",
    img: require("../../../../assets/images/temp/FormalCasualShirts/edited.jpg"),
    product_color: "Black",
    price: 390,
    availableSizes: ["S", "M", "L"]
  },
  {
    id: 6,
    product_name: "Product A",
    img: require("../../../../assets/images/temp/FormalCasualShirts/edited.jpg"),
    product_color: "Black",
    price: 260,
    availableSizes: ["S", "M", "L"]
  },
  {
    id: 7,
    product_name: "Product A",
    img: require("../../../../assets/images/temp/FormalCasualShirts/edited.jpg"),
    product_color: "Black",
    price: 240,
    availableSizes: ["S", "M", "L"]
  },
  {
    id: 8,
    product_name: "Product A",
    img: require("../../../../assets/images/temp/FormalCasualShirts/edited.jpg"),
    product_color: "Black",
    price: 240,
    availableSizes: ["S", "M", "L"]
  },
  {
    id: 9,
    product_name: "Product A",
    img: require("../../../../assets/images/temp/FormalCasualShirts/edited.jpg"),
    product_color: "Black",
    price: 240,
    availableSizes: ["S", "M", "L"]
  },
  {
    id: 10,
    product_name: "Product A",
    img: require("../../../../assets/images/temp/FormalCasualShirts/edited.jpg"),
    product_color: "Black",
    price: 240,
    availableSizes: ["S", "M", "L"]
  },
  {
    id: 11,
    product_name: "Product A",
    img: require("../../../../assets/images/temp/FormalCasualShirts/edited.jpg"),
    product_color: "Black",
    price: 320,
    availableSizes: ["S", "M", "L"]
  }
];
class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: null,
      viewType: "ListView",
      noColumns: 1
    };
  }

  getSizeString = sizeList => {
    let sizeString = "";
    console.log("Size List: ", sizeList);
    sizeList.forEach(element => {
      if (element === "S") {
        sizeString = sizeString + "S, ";
      } else if (element === "M") {
        sizeString = sizeString + "M, ";
      } else {
        sizeString = sizeString + "L";
      }
    });
    console.log("Size String: ", sizeString);
    return sizeString;
  };

  Item({ id, src, name, color, price, sizeString }) {
    return (
      <TouchableOpacity
        style={styles.productContainer}
        onPress={() => this.props.navigation.navigate("ProductPage", { id })}
      >
        <View>
          <Image
            source={src}
            style={{ resizeMode: "stretch", width: 150, height: "100%" }}
          ></Image>
        </View>
        <View style={{ flexDirection: "column", flex: 1 }}>
          <Text
            style={{
              alignSelf: "flex-start",
              marginTop: "10%",
              marginLeft: 25,
              fontSize: normalize(17),
              fontWeight: "500"
            }}
          >
            {name}
          </Text>
          <Text
            style={{ marginLeft: 25, marginTop: 9, fontSize: normalize(12) }}
          >{`Available sizes: ${sizeString}`}</Text>
          <Text
            style={{
              alignSelf: "flex-start",
              marginTop: "28%",
              marginLeft: 25,
              fontSize: normalize(17),
              fontWeight: "600"
            }}
          >{`${`\u20B9`}${price}`}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { noColumns } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <GeneralStatusBarColor
          backgroundColor="#253037"
          barStyle="light-content"
        />
        <SearchBarComponent />
        <View style={styles.filterBar}>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "flex-start"
            }}
          >
            <View
              style={{
                alignSelf: "flex-start",
                width: "50%",
                borderColor: "black",
                borderWidth: 1
              }}
            >
              <Button title="Filter by" style={[styles.viewButonStyles]} />
            </View>
            <View
              style={{ alignSelf: "flex-end", width: "50%", borderWidth: 1 }}
            >
              <Button title="Sort by" style={[styles.viewButonStyles]} />
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            numColumns={noColumns}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              const sizeString = this.getSizeString(item.availableSizes);
              return (
                <this.Item
                  id={item.id}
                  src={item.img}
                  name={item.product_name}
                  color={item.product_color}
                  price={item.price}
                  sizeString={sizeString}
                ></this.Item>
              );
            }}
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
    marginTop: Platform.OS === "android" ? 0 : -STATUSBAR_HEIGHT,
    backgroundColor: "#ffffff"
  },
  productContainer: {
    height: height * 0.3,
    alignSelf: "center",
    borderWidth: 0.5,
    borderColor: "black",
    width,
    alignContent: "center",
    flexDirection: "row",
    borderColor: "#CDCDCD"
  },
  viewButonStyles: {
    borderColor: "black",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  filterBar: { padding: 2, flexDirection: "column", borderWidth: 4 }
});
