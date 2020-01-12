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
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;

class ProductList extends Component {
  constructor(props) {
    const { navigation } = props;
    super(props);
    this.state = {
      products: null,
      viewType: "ListView",
      noColumns: 1,
      filterBy: navigation.getParam("filterBy"),
      productList: []
    };
    this.Item = this.Item.bind(this);
  }
  async componentDidMount() {
    const { filterBy } = this.state;
    var params = {
      filterBy
    };

    var esc = encodeURIComponent;
    var query = Object.keys(params)
      .map(k => esc(k) + "=" + esc(params[k]))
      .join("&");
    const url = `https://wq3nngv3ch.execute-api.ap-south-1.amazonaws.com/dev/v1/products/?${query}`;
    console.log("url: ", url);
    const productList = await axios.get(url);
    console.log("FeaturedProducts: ", productList.data.data);
    this.setState({ productList: productList.data.data });
  }

  getSizeString = sizeList => {
    let sizeString = "";
    console.log("Size List: ", sizeList);
    sizeList.forEach(element => {
      if (element === "S") {
        sizeString = sizeString + "S, ";
      } else if (element === "M") {
        sizeString = sizeString + "M, ";
      } else if (element === "L") {
        sizeString = sizeString + "L, ";
      } else if (element === "XL") {
        sizeString = sizeString + "XL.";
      }
    });
    console.log("Size String: ", sizeString);
    return sizeString;
  };

  Item = ({
    id,
    src,
    name,
    price,
    sizeString,
    availableSizes,
    color,
    design
  }) => {
    return (
      <TouchableOpacity
        style={styles.productContainer}
        onPress={() =>
          this.props.navigation.navigate("ProductPage", {
            id,
            src,
            name,
            price,
            availableSizes,
            color,
            design
          })
        }
      >
        <View>
          <Image
            source={{ uri: src[0], headers: { "Content-Encoding": "gzip" } }}
            style={{ resizeMode: "stretch", width: 150, height: "100%" }}
          ></Image>
        </View>
        <View style={{ flexDirection: "column", flex: 1 }}>
          <Text
            style={{
              alignSelf: "flex-start",
              marginTop: "5%",
              marginLeft: 25,
              fontSize: normalize(14),
              fontWeight: "500",
              height: width * 0.13
            }}
          >
            {name}
          </Text>
          <Text
            style={{ marginLeft: 25, fontSize: normalize(11) }}
          >{`Available sizes: ${sizeString}`}</Text>
          <Text
            style={{ marginLeft: 25, marginTop: 9, fontSize: normalize(11) }}
          >{`Color: ${color}`}</Text>
          <Text
            style={{ marginLeft: 25, marginTop: 9, fontSize: normalize(11) }}
          >{`Design: ${design}`}</Text>
          <Text
            style={{
              alignSelf: "flex-start",
              marginTop: 40,
              marginLeft: 25,
              fontSize: normalize(17),
              fontWeight: "500"
            }}
          >{`${`\u20B9`}${price}`}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { noColumns, productList } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <GeneralStatusBarColor
          backgroundColor="#253037"
          barStyle="light-content"
        />
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 10 }}>
            <SearchBarComponent />
          </View>
          <View style={styles.filterBar}>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                marginTop: 10
              }}
            >
              <View style={{ alignSelf: "centre", flex: 1 }}>
                <TouchableOpacity
                  style={
                    ([styles.viewButonStyles],
                    {
                      flexDirection: "row"
                    })
                  }
                >
                  <Icon name="sort" size={35} style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <FlatList
            data={productList}
            showsVerticalScrollIndicator={false}
            numColumns={noColumns}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              const sizeString = this.getSizeString(item.availableSizes);
              return (
                <this.Item
                  id={item.id}
                  src={item.src}
                  name={item.name}
                  price={item.price}
                  availableSizes={item.availableSizes}
                  sizeString={sizeString}
                  color={item.color}
                  design={item.design}
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
    alignSelf: "center"
  },
  filterBar: {
    flex: 1,
    backgroundColor: "#2a3c3c",
    borderTopWidth: 1
  },
  icon: {
    flex: 1,
    color: "white",
    alignSelf: "center"
  }
});
