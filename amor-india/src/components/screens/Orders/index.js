import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { Auth } from "aws-amplify";
import Icon from "react-native-vector-icons/Ionicons";
import GeneralStatusBarColor from "../../components/GeneralStatusBarColor/GeneralStatusBarColor";
import styles from "./styles";
import axios from "axios";
import OrderList from "../../components/OrderList";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import Loader from "../Loader";
import { normalize } from "../../../../helper";
import uuid from "uuid/v4";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = { orders: null, loading: true };
  }
  async componentDidMount() {
    const orders = await axios
      .get(
        "https://8h6jihqtuj.execute-api.ap-south-1.amazonaws.com/dev/v1/orders/24324-24234-424324"
      )
      .then((result) => result.data.data);
    await this.setState({ orders, loading: false });
  }

  goToOrder = (order) => {
    this.props.navigation.navigate("Order", { order });
  };

  handleLogout = async () => {
    await Auth.signOut();
    const { navigation } = this.props;
    navigation.navigate("Login");
  };

  render() {
    const { orders, loading } = this.state;
    if (loading) {
      return <Loader visible={loading}></Loader>;
    }
    return (
      <SafeAreaView style={styles.container}>
        <GeneralStatusBarColor
          backgroundColor="#253037"
          barStyle="light-content"
        />

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
        {!orders ? (
          <View style={{ alignSelf: "center", marginBottom: 30 }}>
            <Text
              style={{
                fontSize: normalize(20),
                marginTop: 70,
                fontWeight: "300",
              }}
            >
              No Previous Orders
            </Text>
            <TouchableOpacity
              style={{
                alignSelf: "center",
                alignItems: "center",
                padding: 10,
                borderColor: "black",
                borderWidth: 1,
                marginTop: 100,
                width: 200,
              }}
              onPress={() => {
                this.props.navigation.navigate("Home");
              }}
            >
              <Text style={{ fontSize: normalize(15) }}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: "center",
                alignItems: "center",
                padding: 10,
                borderColor: "black",
                borderWidth: 1,
                marginTop: 40,
                width: 200,
              }}
              onPress={() => {
                this.props.navigation.navigate("Categories");
              }}
            >
              <Text style={{ fontSize: normalize(15) }}>Browse Categories</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[1]}
          >
            <View style={{ width: "95%", alignSelf: "center" }}>
              <Text
                style={{
                  alignSelf: "center",
                  marginTop: 10,
                  marginBottom: 10,
                  fontSize: normalize(20),
                }}
              >
                Previous Orders
              </Text>
              <FlatList
                data={orders}
                key={uuid()}
                renderItem={({ item }) => (
                  <View style={{ marginBottom: 20 }}>
                    <OrderList
                      order={item}
                      goToOrder={this.goToOrder}
                    ></OrderList>
                  </View>
                )}
              />
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    );
  }
}
export default Orders;
