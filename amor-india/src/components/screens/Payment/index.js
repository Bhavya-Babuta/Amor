import React, { Component } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import styles from "./styles";
import GeneralStatusBarColor from "../../components/GeneralStatusBarColor/GeneralStatusBarColor";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <GeneralStatusBarColor
          backgroundColor="#253037"
          barStyle="light-content"
        />
        <View style={{ justifyContent: "space-evenly", flex: 0.8 }}>
          <TouchableOpacity
            style={{
              alignSelf: "center",
              borderColor: "black",
              borderRadius: 1,
              borderWidth: 1,
            }}
          >
            <Text style={{ padding: 15 }}>Cash on Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignSelf: "center",
              borderColor: "black",
              borderRadius: 1,
              borderWidth: 1,
            }}
          >
            <Text style={{ padding: 15 }}>Proceed to Payments</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default Payment;
