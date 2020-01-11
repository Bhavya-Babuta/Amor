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
import { StackActions } from "react-navigation";

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
import { normalize } from "../../../../helper";

class ProductPage extends Component {
  constructor(props) {
    const { navigation } = props;
    console.log("Props: ", props);
    super(props);
    this.state = {
      selectedNumber: 0,
      selectedSize: "M",
      src: navigation.getParam("src"),
      name: navigation.getParam("name"),
      price: navigation.getParam("price"),
      availableSizes: navigation.getParam("availableSizes")
    };
    console.log("Props: ", this.props.src);
  }

  getSizesStack = () => {
    const { selectedSize, availableSizes } = this.state;
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

  render() {
    const { src, name, price } = this.state;
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
          <View style={styles.productContainer}>
            <View style={styles.productImageContainer}>
              <Image
                source={src}
                style={styles.productImageFull}
                resizeMethod="scale"
              ></Image>
            </View>
            <View style={{ marginTop: 5, marginLeft: 20, alignSelf: "center" }}>
              <Text
                style={{
                  color: "black",
                  fontSize: normalize(23),
                  marginTop: 5
                }}
              >
                {name}
              </Text>
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
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <View style={{ flexDirection: "row", marginLeft: "7%" }}>
                {this.getSizesStack()}
              </View>
              <View style={{ marginLeft: "27%" }}>
                <TouchableOpacity
                  style={{
                    alignSelf: "center"
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
export default ProductPage;

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
    height: HEIGHT * 0.6,
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
    height: "100%"
  },
  updateButton: {
    width: 35,
    height: "100%",
    backgroundColor: "powderblue"
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
    fontWeight: "100"
  }
});
