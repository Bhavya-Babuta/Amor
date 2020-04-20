import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
  Image,
  Platform,
  StatusBar,
} from "react-native";
import SearchBarComponent from "../../screens/SearchBarComponent";
import GeneralStatusBarColor from "../../components/GeneralStatusBarColor/GeneralStatusBarColor";
import { TouchableOpacity } from "react-native-gesture-handler";
const { normalize } = require("../../../../helper");
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import Loader from "../Loader";
import uuid from "uuid/v4";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;

class ProductList extends Component {
  constructor(props) {
    const { navigation } = props;
    super(props);
    this.state = {
      noColumns: 1,
      category: navigation.getParam("category"),
      productList: [],
      checked: false,
      loading: true,
    };
    this.Item = this.Item.bind(this);
  }

  async componentDidMount() {
    const { category } = this.state;
    var params = { category };
    var esc = encodeURIComponent;
    var query = Object.keys(params)
      .map((k) => esc(k) + "=" + esc(params[k]))
      .join("&");
    const productList = await axios
      .get(
        `https://8h6jihqtuj.execute-api.ap-south-1.amazonaws.com/dev/v1/products/?${query}`
      )
      .then((result) => result.data.data);
    await this.setState({ productList: productList, loading: false });
  }

  getSizeString = (sizeList) => {
    let sizeString = "";
    sizeList.forEach((element) => {
      if (element === "S") {
        sizeString = sizeString + "S, ";
      } else if (element === "M") {
        sizeString = sizeString + "M, ";
      } else if (element === "L") {
        sizeString = sizeString + "L, ";
      } else if (element === "XL") {
        sizeString = sizeString + "XL";
      }
    });
    return sizeString;
  };

  Item = ({ item, sizeString }) => {
    return (
      <TouchableOpacity
        style={styles.productContainer}
        onPress={() =>
          this.props.navigation.navigate("ProductPage", {
            item,
          })
        }
      >
        <View style={{ width: "37%" }}>
          <Image
            source={{
              uri: `https://d182bv3lioi4mj.cloudfront.net${item.src[0]}`,
              headers: { "Accept-Encoding": "gzip" },
            }}
            style={{ resizeMode: "cover", height: "100%" }}
          ></Image>
        </View>
        <View
          style={{
            flexDirection: "column",
            flex: 1,
            flexWrap: "wrap",
            paddingRight: "2%",
            justifyContent: "space-evenly",
            marginLeft: "5%",
          }}
        >
          <Text
            style={{
              alignSelf: "flex-start",
              fontSize: normalize(13),
              fontWeight: "500",
            }}
          >
            {item.name}
          </Text>
          <View>
            <Text
              style={{ fontSize: normalize(11) }}
            >{`Available sizes: ${sizeString}`}</Text>
            <Text
              style={{
                marginTop: "3%",
                fontSize: normalize(11),
              }}
            >{`Color: ${item.color}`}</Text>
          </View>
          <View>
            <Text
              style={{
                alignSelf: "flex-start",
                fontSize: normalize(13),
                fontWeight: "500",
              }}
            >{`${`\u20B9`}${item.price}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { noColumns, productList, loading } = this.state;
    if (loading) {
      return <Loader visible={loading}></Loader>;
    }
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
                marginTop: 10,
              }}
            >
              <View style={{ alignSelf: "center", flex: 1 }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("Filters");
                  }}
                  style={
                    ([styles.viewButonStyles],
                    {
                      flexDirection: "row",
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
            key={uuid()}
            renderItem={({ item }) => {
              const sizeString = this.getSizeString(item.availablesizes);
              return (
                <this.Item item={item} sizeString={sizeString}></this.Item>
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
    backgroundColor: "#ffffff",
  },
  productContainer: {
    height: height * 0.3,
    alignSelf: "center",
    borderWidth: 0.5,
    borderColor: "black",
    width,
    alignContent: "center",
    flexDirection: "row",
    borderColor: "#CDCDCD",
  },
  viewButonStyles: {
    borderColor: "black",
    alignSelf: "center",
  },
  filterBar: {
    flex: 1,
    backgroundColor: "#2a3c3c",
    borderTopWidth: 1,
  },
  icon: {
    flex: 1,
    color: "white",
    alignSelf: "center",
  },
});
