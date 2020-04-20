import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { normalize } from "../../../../helper";

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: props.order,
    };
  }

  getProductList = (products) => {
    const retval = products
      .slice(0, 5)
      .map((element, index) => (
        <Text style={{ padding: 2, fontSize: normalize(10) }}>{`${index + 1}. ${
          element.name
        }`}</Text>
      ));
    if (products.length > 5) {
      retval.push(
        <Text
          style={{ fontWeight: "600", padding: 2, fontSize: normalize(10) }}
        >{`${products.length - 5} More Items.`}</Text>
      );
    }
    return retval;
  };

  render() {
    const { order } = this.state;
    return (
      <View
        style={{
          borderColor: "black",
          borderWidth: 0.2,
        }}
      >
        <Text
          style={{
            alignSelf: "center",
            fontSize: normalize(12),
            fontWeight: "500",
            marginTop: 10,
            marginBottom: 12,
          }}
        >{`Order Id: ${order.orderId}`}</Text>
        <View
          style={{
            marginLeft: 5,
            marginTop: 5,
            flexDirection: "row",
          }}
        >
          <View>
            {["Order Date", "Order Status", "Fulfilled Date", "Products"].map(
              (element) => (
                <Text
                  style={{
                    fontSize: normalize(10),
                    fontWeight: "300",
                    padding: 2,
                    paddingTop: 5,
                    paddingBottom: 5,
                  }}
                >
                  {`${element} :`}
                </Text>
              )
            )}
          </View>
          <View style={{ width: "46.5%" }}>
            {["orderDate", "orderStatus"].map((element) => (
              <Text
                style={{
                  fontSize: normalize(10),
                  fontWeight: "300",
                  padding: 5,
                  paddingRight: 90,
                }}
              >
                {element === "orderDate"
                  ? `${new Date(order.orderDate).getDate()} / ${new Date(
                      order.orderDate
                    ).getMonth()} / ${new Date(order.orderDate).getFullYear()}`
                  : order[element]}
              </Text>
            ))}
            <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-start",
                padding: 5,
              }}
            >
              <Text style={{ fontSize: normalize(10) }}>
                {order.fulfilledDate
                  ? `${new Date(order.fulfilledDate).getDate()} / ${new Date(
                      order.orderDate
                    ).getMonth()} / ${new Date(
                      order.fulfilledDate
                    ).getFullYear()}`
                  : "Pending"}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                alignSelf: "flex-start",
                padding: 2.5,
              }}
            >
              {this.getProductList(order.products)}
            </View>
          </View>

          <View
            style={{
              alignSelf: "center",
            }}
          >
            <Image
              source={{
                uri: order.products[0].src[0],
              }}
              style={{ width: 100, height: 150, marginBottom: 10 }}
            ></Image>
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: normalize(12),
                }}
              >
                +
              </Text>
              <View
                style={{
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 15,
                  width: 22,
                  alignSelf: "center",
                  alignItems: "center",
                  marginLeft: 4,
                }}
              >
                <Text
                  style={{
                    fontSize: normalize(12),
                  }}
                >
                  {order.totalNumberOfItems - 1}
                </Text>
              </View>
              <Text style={{ alignSelf: "center", marginLeft: 5 }}>Items</Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Text
            style={{ marginLeft: 25, fontSize: normalize(10) }}
          >{`Amount: ${`\u20B9`}${order.amount}`}</Text>
          <Text
            style={{ marginLeft: 50, fontSize: normalize(10) }}
          >{`Tax: ${`\u20B9`}${order.tax}`}</Text>
          <Text
            style={{ marginLeft: 50, fontSize: normalize(10) }}
          >{`Total: ${`\u20B9`}${order.amount + order.tax}`}</Text>
        </View>
        <View style={{ marginBottom: 30, marginTop: 30 }}>
          <TouchableOpacity
            style={{
              alignSelf: "center",
              alignItems: "center",
              padding: 5,
              borderColor: "black",
              borderWidth: 1,
              width: 130,
            }}
            onPress={() => this.props.goToOrder(order)}
          >
            <Text style={{ fontSize: normalize(15) }}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default OrderList;
