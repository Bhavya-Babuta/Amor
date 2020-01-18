import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import GeneralStatusBarColor from "../../components/GeneralStatusBarColor/GeneralStatusBarColor";
import { Platform, Dimensions, StatusBar } from "react-native";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addProductToCart } from "./actions";
import { StackActions } from "react-navigation";
import { updateProductCartQuantity } from "../../components/CartList/actions";
import { constants } from "../../../../constants";

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
import { normalize } from "../../../../helper";
import Swiper from "react-native-swiper";

class ProductPage extends Component {
  constructor(props) {
    const { navigation } = props;
    console.log("Props start: ", props);
    super(props);
    this.state = {
      selectedNumber: 0,
      selectedSize: "M",
      item: navigation.getParam("item")
    };
    console.log("Props end: ", this.props.src);
  }

  incrementProductQuantity = value => {
    const { selectedNumber } = this.state;
    this.props.updateProductCartQuantity(value, constants.TASKS.INCREMENT);
    this.setState({ selectedNumber: selectedNumber + 1 });
  };
  decrementProductQuantity = value => {
    const { selectedNumber } = this.state;
    this.props.updateProductCartQuantity(value, constants.TASKS.DECREMENT);
    this.setState({ selectedNumber: selectedNumber - 1 });
  };

  getSizesStack = () => {
    const {
      item: { availableSizes },
      selectedSize
    } = this.state;
    return availableSizes.map(element => (
      <TouchableOpacity
        style={{
          alignSelf: "center"
        }}
        onPress={() => {
          this.setState({ selectedSize: element });
        }}
      >
        <Text
          style={{
            fontSize: normalize(10),
            padding: 15,
            alignSelf: "center",
            backgroundColor: selectedSize === element ? "#CDCDCD" : "white"
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
      selectedSize
    } = this.state;
    return selectedNumber === 0 ? (
      <View style={{ marginLeft: "22%" }}>
        <TouchableOpacity
          style={{
            alignSelf: "center"
          }}
          onPress={() => {
            console.log("This props: ", this.props);
            this.props.addProductToCart({
              id,
              name,
              img: src[0],
              price,
              selectedSize,
              quantity: selectedNumber + 1
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
              borderWidth: 2
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
            this.decrementProductQuantity(id);
          }}
        >
          <Text style={styles.updateButtonText}>-</Text>
        </TouchableOpacity>
        <View
          style={{
            width: 45,
            height: 30,
            marginTop: "4%"
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

  render() {
    const {
      item: { src, name, price, color }
    } = this.state;
    console.log("Source is: ", src);
    console.log("Color: ", color);
    console.log("Props: ", this.props);
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
                  uri: src[0],
                  headers: { "Content-Encoding": "gzip" }
                }}
                style={styles.productImageFull}
                resizeMethod="scale"
              ></Image>
              <Image
                source={{
                  uri: src[1],
                  headers: { "Content-Encoding": "gzip" }
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
                  marginTop: 5
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
                    alignSelf: "center"
                  }}
                >
                  {`${`\u20B9`}${price}`}
                </Text>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", marginTop: 12, marginLeft: "5%" }}
            >
              <View style={{ flexDirection: "row", alignSelf: "center" }}>
                {this.getSizesStack()}
              </View>
              {this.getActionButton()}
            </View>
            <View
              style={{
                marginTop: 20,
                marginBottom: 20,
                width: WIDTH * 0.8,
                alignSelf: "center"
              }}
            >
              <Text style={{ textAlign: "justify", fontSize: normalize(13) }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => {
  return { cart: state.cart };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addProductToCart,
      updateProductCartQuantity
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 0 : -STATUSBAR_HEIGHT,
    backgroundColor: "#ffffff"
  },
  header: {
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderBottomColor: "#CDCDCD",
    borderBottomWidth: 0.5,
    alignSelf: "center"
  },
  background: {
    resizeMode: "cover",
    overflow: "hidden",
    width: WIDTH * 0.85,
    maxHeight: 50
  },
  productImageFull: {
    width: WIDTH * 0.7,
    height: "100%",
    alignSelf: "center"
  },
  productImageContainer: {
    alignSelf: "center",
    marginTop: 10
  },
  productContainer: {
    flex: 1
  },
  updateStack: {
    flexDirection: "row",
    alignSelf: "center",
    borderWidth: 0.5,
    borderColor: "#CDCDCD",
    borderRadius: 4,
    height: "100%",
    marginLeft: "22%"
  },
  updateButton: {
    width: 35,
    height: "100%",
    backgroundColor: "#CDCDCD"
  },
  quantityText: {
    alignSelf: "center",
    marginTop: "20%",
    fontSize: normalize(13),
    fontWeight: "300"
  },
  updateButtonText: {
    fontSize: normalize(25),
    alignSelf: "center",
    fontWeight: "100",
    marginTop: "7%"
  }
});
