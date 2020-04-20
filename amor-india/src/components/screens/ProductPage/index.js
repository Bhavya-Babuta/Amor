import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import GeneralStatusBarColor from "../../components/GeneralStatusBarColor/GeneralStatusBarColor";
import { Platform, Dimensions, StatusBar } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addProductToCart } from "./actions";
import { StackActions } from "react-navigation";
import { updateProductCartQuantity } from "../../components/CartList/actions";
import { constants } from "../../../../constants";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import Swiper from "react-native-swiper";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
import { normalize } from "../../../../helper";

class ProductPage extends Component {
  constructor(props) {
    const { navigation } = props;
    super(props);
    this.state = {
      selectedNumber: this.getSelectedNumber(
        navigation.getParam("item"),
        props.cart.currentValue,
        navigation.getParam("item")["availablesizes"][0]
      ),
      selectedSize:
        navigation.getParam("selectedSize") ||
        navigation.getParam("item")["availablesizes"][0],
      item: navigation.getParam("item"),
      descriptionModalShow: false,
      cartProducts: props.cart.currentValue,
    };
  }

  componentDidUpdate() {
    if (
      JSON.stringify(this.props.cart.currentValue) !=
      JSON.stringify(this.state.cartProducts)
    ) {
      this.setState({ cartProducts: this.props.cart.currentValue });
    }
  }
  static getDerivedStateFromProps(newProps, prevState) {
    return newProps.cart.currentValue || null;
  }

  getSelectedNumber = (item, cartProducts, size = null) => {
    let selectedNumber = 0;
    cartProducts.forEach((element) => {
      if (element.name === item.name) {
        if (size) {
          if (element.selectedSize === size) {
            selectedNumber = element.quantity;
          }
        } else {
          selectedNumber = element.quantity;
        }
      }
    });
    return selectedNumber;
  };

  incrementProductQuantity = (value) => {
    const { selectedNumber, selectedSize } = this.state;
    this.props.updateProductCartQuantity(
      value,
      selectedSize,
      constants.TASKS.INCREMENT
    );
    this.setState({ selectedNumber: selectedNumber + 1 });
  };
  decrementProductQuantity = (value) => {
    const { selectedNumber, selectedSize } = this.state;
    this.props.updateProductCartQuantity(
      value,
      selectedSize,
      constants.TASKS.DECREMENT
    );
    this.setState({ selectedNumber: selectedNumber - 1 });
  };

  getProductDescription = () => {
    const { item } = this.state;
    return Object.keys(item).map((element) => {
      if (!["name", "price", "id", "featured", "src"].includes(element)) {
        return (
          <View style={{ padding: 2 }}>
            <Text style={{ fontSize: normalize(13), fontWeight: "500" }}>
              {`${this.getKeyString(element)} : `}
              <Text
                style={{
                  fontSize: normalize(12),
                  marginLeft: "2%",
                  padding: 10,
                  fontWeight: "300",
                }}
              >{`${item[element]}`}</Text>
            </Text>
          </View>
        );
      }
    });
  };

  getSizesStack = () => {
    const {
      item: { availablesizes },
      selectedSize,
    } = this.state;
    return availablesizes.map((element) => (
      <TouchableOpacity
        style={{
          alignSelf: "center",
        }}
        onPress={async () => {
          const {
            cartProducts,
            item: { name, id },
          } = this.state;
          await this.setState({ selectedSize: element });
          const selectedNumber = this.getSelectedNumber(
            { name, id },
            cartProducts,
            element
          );
          this.setState({ selectedNumber });
        }}
      >
        <Text
          style={{
            fontSize: normalize(10),
            padding: 15,
            alignSelf: "center",
            backgroundColor: selectedSize === element ? "#CDCDCD" : "white",
          }}
        >
          {element}
        </Text>
      </TouchableOpacity>
    ));
  };

  getActionButton = () => {
    const {
      item: { id, name, src, price },
      selectedNumber,
      selectedSize,
    } = this.state;
    return selectedNumber === 0 ? (
      <View>
        <TouchableOpacity
          style={{
            alignSelf: "center",
          }}
          onPress={() => {
            this.props.addProductToCart({
              id,
              name,
              img: src[0],
              price,
              selectedSize,
              quantity: selectedNumber + 1,
            });
            this.setState({ selectedNumber: selectedNumber + 1 });
          }}
        >
          <Text
            style={{
              fontSize: normalize(13),
              paddingTop: 10,
              paddingBottom: 10,
              paddingRight: 20,
              paddingLeft: 20,
              alignSelf: "center",
              borderWidth: 2,
            }}
          >
            Add to cart
          </Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View style={[styles.updateStack]}>
        <TouchableOpacity
          style={[styles.updateButton, styles.radiusLeft]}
          onPress={() => {
            this.decrementProductQuantity(id, selectedSize);
          }}
        >
          <Text style={styles.updateButtonText}>-</Text>
        </TouchableOpacity>
        <View
          style={{
            width: 45,
            height: 30,
            marginTop: "4%",
          }}
        >
          <Text style={styles.quantityText}>{selectedNumber}</Text>
        </View>
        <TouchableOpacity
          style={[styles.updateButton, styles.raduisRight]}
          onPress={() => {
            this.incrementProductQuantity(id);
          }}
        >
          <Text style={styles.updateButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  };

  getKeyString(key) {
    const keyString = key.replace("_", " ").toLowerCase().split(" ");
    for (var i = 0; i < keyString.length; i++) {
      keyString[i] =
        keyString[i].charAt(0).toUpperCase() + keyString[i].slice(1);
    }
    return keyString.join(" ");
  }

  render() {
    const {
      item: { src, name, price },
      descriptionModalShow,
    } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <GeneralStatusBarColor
          backgroundColor="#253037"
          barStyle="light-content"
        />

        <View style={styles.header}>
          <Icon
            name="keyboard-backspace"
            size={30}
            onPress={() => {
              const popAction = StackActions.pop({ n: 1 });
              this.props.navigation.dispatch(popAction);
            }}
          ></Icon>
          <Image
            source={require("../../../../assets/images/amorbranding-white.jpg")}
            style={styles.background}
          ></Image>
        </View>
        <ScrollView
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[1]}
        >
          <View style={styles.productImageContainer}>
            <Swiper
              autoplay={false}
              showsButtons={true}
              showsPagination={false}
              style={{ color: "black", height: HEIGHT * 0.6 }}
            >
              <Image
                source={{
                  uri: `https://d182bv3lioi4mj.cloudfront.net${
                    src[0] ? src[0].trim() : null
                  }`,
                  headers: { "Accept-Encoding": "gzip" },
                }}
                style={styles.productImageFull}
                resizeMethod="scale"
              ></Image>
              <Image
                source={{
                  uri: `https://d182bv3lioi4mj.cloudfront.net${
                    src[1] ? src[1].trim() : null
                  }`,
                  headers: { "Accept-Encoding": "gzip" },
                }}
                style={styles.productImageFull}
                resizeMethod="scale"
              ></Image>
            </Swiper>
            <View style={{ marginTop: 5, flex: 1, alignSelf: "center" }}>
              <Text
                style={{
                  color: "black",
                  fontSize: normalize(23),
                  marginTop: 5,
                }}
              >
                {name}
              </Text>
              <View>
                <Text
                  style={{
                    color: "black",
                    fontSize: normalize(15),
                    marginTop: 5,
                    alignSelf: "center",
                  }}
                >
                  {`${`\u20B9`}${price}`}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                padding: 20,
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                {this.getSizesStack()}
              </View>
              {this.getActionButton()}
            </View>
            <TouchableOpacity
              style={{
                borderWidth: 0.3,
                marginTop: 20,
                backgroundColor: "#CDCDCD",
                flexDirection: "row",
              }}
              onPress={() => {
                this.setState({ descriptionModalShow: !descriptionModalShow });
              }}
            >
              <Text
                style={{
                  fontSize: normalize(18),
                  marginLeft: "2%",
                  fontWeight: "400",
                  padding: 15,
                }}
              >
                Product Description
              </Text>
              <AntDesignIcons
                name="caretdown"
                size={normalize(18)}
                style={{ marginTop: "3%", marginLeft: "25%" }}
              ></AntDesignIcons>
            </TouchableOpacity>
            <View
              style={
                descriptionModalShow
                  ? {
                      marginTop: 20,
                      marginBottom: 20,
                      width: WIDTH * 0.8,
                      alignSelf: "center",
                    }
                  : { display: "none" }
              }
            >
              {this.getProductDescription()}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  return { cart: state.cart };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addProductToCart,
      updateProductCartQuantity,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 0 : -STATUSBAR_HEIGHT,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderBottomColor: "#CDCDCD",
    borderBottomWidth: 0.5,
    alignSelf: "center",
  },
  background: {
    resizeMode: "cover",
    overflow: "hidden",
    width: WIDTH * 0.85,
    maxHeight: 50,
  },
  productImageFull: {
    width: WIDTH * 0.7,
    height: "100%",
    alignSelf: "center",
  },
  productImageContainer: {
    alignSelf: "center",
    marginTop: 10,
  },
  productContainer: {
    flex: 1,
  },
  updateStack: {
    flexDirection: "row",
    alignSelf: "center",
    borderWidth: 0.5,
    borderColor: "#CDCDCD",
    borderRadius: 4,
    height: "100%",
    marginLeft: "22%",
  },
  updateButton: {
    width: 35,
    height: "100%",
    backgroundColor: "#CDCDCD",
  },
  quantityText: {
    alignSelf: "center",
    marginTop: "20%",
    fontSize: normalize(13),
    fontWeight: "300",
  },
  updateButtonText: {
    fontSize: normalize(25),
    alignSelf: "center",
    fontWeight: "100",
    marginTop: "7%",
  },
});
