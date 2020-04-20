import React, { Component } from "react";
import { View, Text, Image } from "react-native";

class OrderedProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: props.products,
    };
  }

  getOrderedProductList = () => {
    const { products } = this.state;
    return products.map((product) => {
      return (
        <View
          style={{
            padding: 15,
            flexDirection: "row",
          }}
        >
          <View>
            <Image
              source={{
                uri: `${product.src[0]}`,
                headers: { "Accept-Encoding": "gzip" },
              }}
              style={{ width: 100, height: 150 }}
            />
          </View>
          <View style={{ marginLeft: 15 }}>
            {[
              "Product Name: ",
              "Product Size: ",
              "Product Quantity: ",
              "Total Amount: ",
            ].map((element) => (
              <Text>{element}</Text>
            ))}
          </View>
          <View style={{ marginLeft: 1 }}>
            {["name", "selectedSize", "selectedNumber", "price"].map(
              (element) => {
                if (element === "price") {
                  return <Text>{product.price * product.selectedNumber}</Text>;
                }
                return (
                  <Text style={{ flexShrink: 1 }}>{product[element]}</Text>
                );
              }
            )}
          </View>
        </View>
      );
    });
  };

  render() {
    return <View>{this.getOrderedProductList()}</View>;
  }
}
export default OrderedProducts;
