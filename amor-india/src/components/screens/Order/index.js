import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import GeneralStatusBarColor from "../../components/GeneralStatusBarColor/GeneralStatusBarColor";
import styles from "./styles";
import { normalize } from "../../../../helper";
import { ScrollView } from "react-native-gesture-handler";
import OrderedProducts from "./OrderedProducts";

class Order extends Component {
  constructor(props) {
    super(props);
    const { navigation } = props;
    this.state = {
      order: navigation.getParam("order"),
    };
  }

  _handleCall = () => {
    const url = `tel:+919999050671`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        return Linking.openURL(url).catch(() => null);
      }
    });
  };
  render() {
    const { order } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <GeneralStatusBarColor
          backgroundColor="#253037"
          barStyle="light-content"
        />
        <ScrollView>
          <View style={styles.header}>
            <Icon
              name="md-menu"
              size={30}
              style={styles.icon}
              onPress={() => this.props.navigation.openDrawer()}
            />
            <Image
              source={require("../../../../assets/images/amorbranding-white.jpg")}
              style={styles.background}
            ></Image>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 15,
            }}
          >
            <Text style={{ fontSize: normalize(20) }}>Order Id: </Text>
            <Text style={{ fontSize: normalize(20), fontWeight: "500" }}>
              {order.orderId}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
              }}
            >
              <Text style={{ fontSize: normalize(12) }}>Order Date: </Text>
              <Text style={{ fontSize: normalize(12), fontWeight: "500" }}>
                {`${new Date(order.orderDate).getDate()} / ${new Date(
                  order.orderDate
                ).getMonth()} / ${new Date(order.orderDate).getFullYear()}`}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
              }}
            >
              <Text style={{ fontSize: normalize(12) }}>Delivery Date:</Text>
              <Text style={{ fontSize: normalize(12), fontWeight: "500" }}>
                {order.fulfilledDate
                  ? `${new Date(order.fulfilledDate).getDate()} / ${new Date(
                      order.fulfilledDate
                    ).getMonth()} / ${new Date(
                      order.fulfilledDate
                    ).getFullYear()}`
                  : " Pending"}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: normalize(12) }}>Order Status: </Text>
            <Text style={{ fontSize: normalize(12), fontWeight: "500" }}>
              {order.orderStatus}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: normalize(15),
                fontWeight: "500",
                textDecorationLine: "underline",
              }}
            >
              Product Details
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: normalize(12) }}>Number of Products:</Text>
            <Text style={{ fontSize: normalize(12), fontWeight: "500" }}>
              {order.totalNumberOfItems}
            </Text>
          </View>
          <View style={{ justifyContent: "space-evenly", marginTop: 10 }}>
            <OrderedProducts products={order.products}></OrderedProducts>
          </View>
          <View
            style={{ justifyContent: "space-evenly", flexDirection: "row" }}
          >
            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
                paddingHorizontal: 15,
              }}
            >
              <Text style={{ fontSize: normalize(12) }}>MRP: </Text>
              <Text style={{ fontSize: normalize(12), fontWeight: "500" }}>
                {`${`\u20B9`}${order.amount}`}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
                paddingHorizontal: 15,
              }}
            >
              <Text style={{ fontSize: normalize(12) }}>Tax: </Text>
              <Text style={{ fontSize: normalize(12), fontWeight: "500" }}>
                {`${`\u20B9`}${order.tax}`}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
                paddingHorizontal: 15,
              }}
            >
              <Text style={{ fontSize: normalize(12) }}>Total Amount:</Text>
              <Text style={{ fontSize: normalize(12), fontWeight: "500" }}>
                {`${`\u20B9`}${order.tax + order.amount}`}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: normalize(15),
                fontWeight: "500",
                textDecorationLine: "underline",
              }}
            >
              Contact Details
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingRight: 10,
              paddingLeft: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
              }}
            >
              <Text style={{ fontSize: normalize(12) }}>Address Line: </Text>
              <Text style={{ fontSize: normalize(12), fontWeight: "500" }}>
                {order.address.addLine1}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
              }}
            >
              <Text style={{ fontSize: normalize(12) }}>Street: </Text>
              <Text style={{ fontSize: normalize(12), fontWeight: "500" }}>
                {order.address.street}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingRight: 10,
              paddingLeft: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
              }}
            >
              <Text style={{ fontSize: normalize(12) }}>City: </Text>
              <Text style={{ fontSize: normalize(12), fontWeight: "500" }}>
                {order.address.city}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
              }}
            >
              <Text style={{ fontSize: normalize(12) }}>State: </Text>
              <Text style={{ fontSize: normalize(12), fontWeight: "500" }}>
                {order.address.state}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              paddingRight: 10,
              paddingLeft: 10,
            }}
          >
            <Text style={{ fontSize: normalize(12) }}>Zipcode: </Text>
            <Text style={{ fontSize: normalize(12), fontWeight: "500" }}>
              {order.address.zipcode}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              paddingRight: 10,
              paddingLeft: 10,
            }}
          >
            <Text style={{ fontSize: normalize(12) }}>Contact Number: </Text>
            <Text style={{ fontSize: normalize(12), fontWeight: "500" }}>
              {order.phone_number}
            </Text>
          </View>
          <View style={{ marginTop: 30, marginBottom: 30 }}>
            <Text style={{ textAlign: "center" }}>
              {order.fulfilledDate && order.orderStatus === "Delivered"
                ? "Not satisfied? Get in touch with us:"
                : "Ask about your order status. Get in touch with us:"}
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <TouchableOpacity
                style={{
                  borderWidth: 2,
                  borderColor: "black",
                  width: "25%",
                  marginTop: 20,
                }}
              >
                <Text
                  style={{ padding: 10, alignSelf: "center" }}
                  onPress={() => {
                    Linking.openURL(
                      `whatsapp://send?text=This%20is%20regarding%20order%20id:%20${order.orderId}.&phone=+919999050671`
                    );
                  }}
                >
                  Whatsapp
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderWidth: 2,
                  borderColor: "black",
                  width: "25%",
                  marginTop: 20,
                }}
              >
                <Text
                  style={{ padding: 10, alignSelf: "center" }}
                  onPress={() =>
                    Linking.openURL(
                      `mailto:amorapparels@gmail.com?subject=OrderId: ${order.orderId}&body=WRITE BELOW THIS`
                    )
                  }
                >
                  Mail
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderWidth: 2,
                  borderColor: "black",
                  width: "25%",
                  marginTop: 20,
                }}
              >
                <Text
                  style={{ padding: 10, alignSelf: "center" }}
                  onPress={this._handleCall}
                >
                  Call
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
export default Order;
