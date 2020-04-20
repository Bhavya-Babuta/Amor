import React, { Component } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import CartList from "../../components/CartList";
import styles from "./styles";
import { normalize } from "../../../../helper";
import { clearCart } from "../../components/CartList/actions";
import { bindActionCreators } from "redux";
import GeneralStatusBarColor from "../../components/GeneralStatusBarColor/GeneralStatusBarColor";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartProducts: props.cart.currentValue || [],
      finalAmount: 0.0,
      tax: 0.0,
      total: 0.0,
    };
    this.getSubTotal = this.getSubTotal.bind(this);
  }

  static getDerivedStateFromProps(newProps, prevState) {
    return newProps.cart.currentValue || null;
  }
  componentDidUpdate() {
    if (
      JSON.stringify(this.props.cart.currentValue) !=
      JSON.stringify(this.state.cartProducts)
    ) {
      this.setState({ cartProducts: this.props.cart.currentValue });
    }
  }

  componentDidMount() {
    const { cartProducts } = this.state;
    this.getSubTotal(cartProducts);
  }

  getSubTotal(cartProducts) {
    let total = null;
    cartProducts.forEach((element) => {
      total = total + element.quantity * element.price;
    });
    total = total || 0.0;
    const tax = total > 1000.0 ? 0.12 * total : 0.05 * total;
    this.setState({
      tax,
      finalAmount: (tax + total || 0).toFixed(2),
      total: total.toFixed(2),
    });
  }

  render() {
    const { cartProducts, total, finalAmount, tax } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <GeneralStatusBarColor
          backgroundColor="#253037"
          barStyle="light-content"
        />
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "white",
            padding: 15,
          }}
        >
          <View style={{ width: "95%", justifyContent: "space-around" }}>
            <Text
              style={{
                fontSize: normalize(18),
              }}
            >
              Shopping Cart
            </Text>
          </View>
          <View style={{}}>
            <TouchableOpacity onPress={() => this.props.clearCart()}>
              {cartProducts.length > 0 ? (
                <Icon name="trash" size={25} color="#000000" />
              ) : null}
            </TouchableOpacity>
          </View>
        </View>
        {cartProducts.length === 0 ? (
          <View
            style={{
              alignSelf: "center",
              height: "60%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: normalize(15) }}>Add Products</Text>
            <TouchableOpacity
              style={[
                styles.proceedButton,
                { paddingLeft: 50, paddingRight: 50, marginTop: 20 },
              ]}
              onPress={() => {
                this.props.navigation.navigate("Categories");
              }}
            >
              <Text style={styles.proceedText}>Browse Categories</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{}}>
            <View style={styles.cartList}>
              <CartList
                cartProducts={cartProducts}
                getSubTotal={this.getSubTotal}
              />
            </View>
            <View style={styles.summary}>
              <View
                style={{
                  borderColor: "#ffffff",
                  borderWidth: 2,
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  borderBottomColor: "#CDCDCD",
                  borderBottomWidth: 1,
                  flexDirection: "row",
                  backgroundColor: "#ffffff",
                  justifyContent: "space-between",
                  padding: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: normalize(12),
                    fontWeight: "300",
                  }}
                >
                  Summary :
                </Text>
                <Text
                  style={{
                    fontSize: normalize(12),
                    fontWeight: "300",
                  }}
                >
                  {`${`\u20B9`}${total}`}
                </Text>
              </View>
              <View
                style={{
                  borderColor: "#ffffff",
                  borderWidth: 2,
                  borderBottomColor: "#CDCDCD",
                  borderBottomWidth: 1,
                  flexDirection: "row",
                  backgroundColor: "#ffffff",
                  justifyContent: "space-between",
                  padding: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: normalize(12),
                    fontWeight: "300",
                  }}
                >
                  Taxes :
                </Text>
                <Text
                  style={{
                    fontSize: normalize(12),
                    fontWeight: "300",
                  }}
                >
                  {`${`\u20B9`}${tax.toFixed(2)}`}
                </Text>
              </View>
              <View
                style={{
                  borderColor: "#ffffff",
                  borderBottomRightRadius: 15,
                  borderBottomLeftRadius: 15,
                  flexDirection: "row",
                  backgroundColor: "#ffffff",
                  justifyContent: "space-between",
                  padding: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: normalize(15),
                    fontWeight: "300",
                  }}
                >
                  Total :
                </Text>
                <Text
                  style={{
                    fontSize: normalize(15),
                    fontWeight: "300",
                  }}
                >
                  {`${`\u20B9`}${finalAmount}`}
                </Text>
              </View>
              <View style={{ marginTop: 20 }}>
                <TouchableOpacity
                  style={[styles.proceedButton]}
                  onPress={() =>
                    this.props.navigation.navigate("ManageAddress", {
                      checkout: true,
                    })
                  }
                >
                  <Text style={styles.proceedText}>Proceed to checkout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
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
      clearCart,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
