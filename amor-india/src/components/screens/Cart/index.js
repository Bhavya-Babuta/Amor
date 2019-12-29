import React, { Component } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import CartList from "../../components/CartList";
import styles from "./styles";
import { normalize } from "../../../../helper";
class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartProducts: this.props.cart.currentValue,
      tax: 40.0
    };
    this.getSubTotal = this.getSubTotal.bind(this);
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => (
        <Text
          style={{
            fontSize: normalize(20),
            textAlign: "center",
            alignSelf: "center"
          }}
        >
          Shopping Cart
        </Text>
      ),
      headerRight: () => (
        <TouchableOpacity>
          <Icon
            name="check-circle"
            size={25}
            color="#000000"
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
      )
    };
  };

  static getDerivedStateFromProps(newProps, prevState) {
    const { total } = newProps;
    return total || null;
  }
  componentDidMount() {
    const { cartProducts } = this.state;
    this.getSubTotal(cartProducts);
  }

  getSubTotal(cartProducts) {
    const { tax } = this.state;
    console.log("updating subtotal");
    let total = null;
    cartProducts.forEach(element => {
      total = total + element.quantity * element.price;
    });
    console.log("subtotal: ", total);
    this.setState({ finalAmount: tax + total });
    this.setState({ total: total.toFixed(2) });
  }
  render() {
    const { cartProducts, total, finalAmount, tax } = this.state;
    console.log("Cart Products: ", cartProducts);
    return (
      <SafeAreaView style={styles.container}>
        {cartProducts.length === 0 ? (
          <View
            style={{
              flex: 1,
              alignSelf: "center",
              marginTop: "40%"
            }}
          >
            <Text style={{ fontSize: 25 }}>The shopping cart is empty</Text>
          </View>
        ) : (
          <View style={{ flex: 3 }}>
            <View style={styles.cartList}>
              <CartList
                cartProducts={cartProducts}
                getSubTotal={this.getSubTotal}
              />
            </View>
            <View style={styles.summary}>
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flex: 1,
                    borderColor: "#ffffff",
                    borderWidth: 2,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    borderBottomColor: "#CDCDCD",
                    borderBottomWidth: 1,
                    flexDirection: "row"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "300",
                      marginTop: 25,
                      marginLeft: 20
                    }}
                  >
                    Summary :
                  </Text>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "300",
                      marginTop: 26,
                      marginLeft: "45%"
                    }}
                  >
                    {`${`\u20B9`}${total}`}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    borderColor: "#ffffff",
                    borderWidth: 2,
                    borderBottomColor: "#CDCDCD",
                    borderBottomWidth: 1,
                    flexDirection: "row"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "300",
                      marginTop: 23,
                      marginLeft: 20
                    }}
                  >
                    Taxes :
                  </Text>
                  <Text
                    style={{
                      alignSelf: "flex-end",
                      fontSize: 17,
                      fontWeight: "300",
                      marginLeft: "53.5%",
                      marginBottom: 25
                    }}
                  >
                    {`${`\u20B9`}${tax.toFixed(2)}`}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    borderColor: "#ffffff",
                    borderBottomStartRadius: 15,
                    borderBottomLeftRadius: 15,
                    flexDirection: "row"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 28,
                      fontWeight: "500",
                      marginTop: 18,
                      marginLeft: 20
                    }}
                  >
                    Total :
                  </Text>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: "300",
                      marginTop: 23,
                      marginLeft: "49%"
                    }}
                  >
                    {`${`\u20B9`}${finalAmount}`}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return { cart: state.cart };
};

export default connect(mapStateToProps, null)(Cart);
