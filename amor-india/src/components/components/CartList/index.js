import React from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import styles from "./styles";
import { constants } from "../../../../constants";
import { bindActionCreators } from "redux";
import { updateProductCartQuantity } from "./actions";
import { connect } from "react-redux";

class CartList extends React.Component {
  constructor(props) {
    super(props);
    console.log("this.props.cartProducts: ", this.props.cartProducts);
    this.state = {
      cartProducts: this.props.cartProducts
    };
  }

  static getDerivedStateFromProps(newProps, prevState) {
    console.log("New Props: ", newProps);
    const { getSubTotal, cart } = newProps;
    getSubTotal(cart.currentValue);
    return newProps;
  }

  incrementProductQuantity = value => {
    this.props.updateProductCartQuantity(value, constants.TASKS.INCREMENT);
  };
  decrementProductQuantity = value => {
    this.props.updateProductCartQuantity(value, constants.TASKS.DECREMENT);
  };
  render() {
    const { cartProducts } = this.state;
    return (
      <FlatList
        data={cartProducts}
        keyExtractor={(item, index) => item.id}
        contentContainerStyle={{ marginBottom: 20 }}
        horizontal={true}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image
              style={styles.image}
              source={{
                uri: item.img,
                headers: { "Content-Encoding": "gzip" }
              }}
            />
            <Text
              style={styles.productName}
            >{`${item.name} (${item.selectedSize})`}</Text>
            <View style={styles.updateStack}>
              <TouchableOpacity
                style={[styles.updateButton, styles.radiusLeft]}
                onPress={() => {
                  this.decrementProductQuantity(item.id);
                }}
              >
                <Text style={styles.updateButtonText}>-</Text>
              </TouchableOpacity>
              <View
                style={{
                  width: 45,
                  height: 30
                }}
              >
                <Text style={styles.quantityText}>{item.quantity}</Text>
              </View>
              <TouchableOpacity
                style={[styles.updateButton, styles.raduisRight]}
                onPress={() => {
                  this.incrementProductQuantity(item.id);
                }}
              >
                <Text style={styles.updateButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    );
  }
}

const mapStateToProps = state => {
  return { cart: state.cart };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateProductCartQuantity
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CartList);
