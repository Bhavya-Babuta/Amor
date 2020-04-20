import React from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import styles from "./styles";
import { constants } from "../../../../constants";
import { bindActionCreators } from "redux";
import { updateProductCartQuantity } from "./actions";
import { connect } from "react-redux";
import uuid from "uuid/v4";

class CartList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartProducts: props.cartProducts,
    };
  }

  static getDerivedStateFromProps(newProps, prevState) {
    const { getSubTotal, cart } = newProps;
    getSubTotal(cart.currentValue);
    return newProps;
  }

  incrementProductQuantity = (value, selectedSize) => {
    this.props.updateProductCartQuantity(
      value,
      selectedSize,
      constants.TASKS.INCREMENT
    );
  };

  decrementProductQuantity = (value, selectedSize) => {
    this.props.updateProductCartQuantity(
      value,
      selectedSize,
      constants.TASKS.DECREMENT
    );
  };

  render() {
    const { cartProducts } = this.state;
    return (
      <FlatList
        data={cartProducts}
        key={uuid()}
        horizontal={true}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <View style={{ height: "72%" }}>
              <Image
                style={styles.image}
                source={{
                  uri: `https://d182bv3lioi4mj.cloudfront.net${item.img}`,
                  headers: { "Accept-Encoding": "gzip" },
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "column",
                flex: 1,
                justifyContent: "space-evenly",
              }}
            >
              <View
                style={
                  {
                    // paddingTop: 8,
                    // paddingRight: 10,
                    // paddingLeft: 10,
                    // paddingBottom: 5,
                  }
                }
              >
                <Text
                  style={styles.productName}
                >{`${item.name} (${item.selectedSize})`}</Text>
              </View>
              <View style={styles.updateStack}>
                <TouchableOpacity
                  style={[styles.updateButton, styles.radiusLeft]}
                  onPress={() => {
                    this.decrementProductQuantity(item.id, item.selectedSize);
                  }}
                >
                  <Text style={styles.updateButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity
                  style={[styles.updateButton, styles.raduisRight]}
                  onPress={() => {
                    this.incrementProductQuantity(item.id, item.selectedSize);
                  }}
                >
                  <Text style={styles.updateButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return { cart: state.cart };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateProductCartQuantity,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CartList);
