import React, { Component } from "react";
import { View, Text, SafeAreaView, ScrollView, FlatList } from "react-native";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Auth } from "aws-amplify";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateUserProfileToStore } from "../Login/actions";
import uuid from "uuid/v4";
import GeneralStatusBarColor from "../../components/GeneralStatusBarColor/GeneralStatusBarColor";

class ManageAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editAddress: null,
      address: JSON.parse(props.user.address),
      checkout:
        props.navigation && props.navigation.getParam("checkout")
          ? true
          : false,
    };
  }

  handleDeleteAddress = async (item) => {
    const { address } = this.state;
    const newAddress = address.filter((element) => {
      if (element !== item) {
        return element;
      }
    });
    this.setState({ address: newAddress });
    return Auth.currentAuthenticatedUser().then(async (user) => {
      return await Auth.updateUserAttributes(user, {
        address: JSON.stringify(newAddress),
      }).then((result) => {
        this.props.updateUserProfileToStore({
          address: JSON.stringify(newAddress),
        });
        return result;
      });
    });
  };

  handleSelectAddress = (item) => {
    this.props.navigation.navigate("Payment", {
      address: item,
    });
  };

  handleEditAddress = async (item) => {
    await this.setState({
      editAddress: item,
    });
    this.props.navigation.navigate("AddNewAddress", {
      editAddress: item,
      checkout: this.state.checkout,
      handleClose: async function (navigation, showSelect, addresses) {
        navigation.navigate("ManageAddress", { checkout: showSelect });
        await this.setState({ checkout: showSelect });
        await this.setState({ address: addresses });
      }.bind(this),
    });
  };

  getAddressList = () => {
    const { address } = this.state;
    return address.map((element) => element);
  };

  render() {
    const { address, checkout } = this.state;
    console.log("Checkout: ", checkout);
    return (
      <SafeAreaView style={styles.container}>
        <GeneralStatusBarColor
          backgroundColor="#253037"
          barStyle="light-content"
        />
        <View
          style={{
            flexDirection: "row",
            height: 50,
            borderBottomColor: "#cdcdcd",
            borderBottomWidth: 0.5,
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <View style={{}}>
            <Text
              style={{
                marginTop: "1.5%",
                fontSize: 20,
              }}
            >
              Manage Address
            </Text>
          </View>
          <View style={{ marginRight: 15 }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Ionicons name="md-close" size={26} color="green" />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[1]}
        >
          <FlatList
            data={address}
            key={uuid()}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  borderColor: "#cdcdcd",
                  borderBottomWidth: 0.5,
                  padding: 10,
                  marginTop: 5,
                }}
              >
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <View style={{ flexDirection: "row", padding: 5 }}>
                    <Text>House/Apartment Name:</Text>
                    <Text
                      style={{
                        alignSelf: "center",
                        fontWeight: "500",
                      }}
                    >
                      {item.addLine1}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", padding: 5 }}>
                    <Text>Street Name: </Text>
                    <Text
                      style={{
                        alignSelf: "center",
                        fontWeight: "500",
                      }}
                    >
                      {item.street}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", padding: 5 }}>
                    <Text>City: </Text>
                    <Text
                      style={{
                        alignSelf: "center",
                        fontWeight: "500",
                      }}
                    >
                      {item.city}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", padding: 5 }}>
                    <Text>State: </Text>
                    <Text
                      style={{
                        alignSelf: "center",
                        fontWeight: "500",
                      }}
                    >
                      {item.state}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      padding: 5,
                    }}
                  >
                    <Text>Zipcode: </Text>
                    <Text
                      style={{
                        alignSelf: "center",
                        fontWeight: "500",
                      }}
                    >
                      {item.zipcode}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      padding: 5,
                      marginBottom: 25,
                    }}
                  >
                    <Text>Default Address: </Text>
                    <Text
                      style={{
                        alignSelf: "center",
                        fontWeight: "500",
                      }}
                    >
                      {item.isDefault ? "Yes" : "No"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    alignSelf: "center",
                  }}
                >
                  {checkout ? (
                    <TouchableOpacity
                      style={{
                        borderWidth: 1,
                        borderColor: "black",
                        marginBottom: "35%",
                      }}
                      onPress={() => this.handleSelectAddress(item)}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          padding: 10,
                          alignSelf: "center",
                        }}
                      >
                        Select
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      borderColor: "black",
                      marginBottom: "35%",
                    }}
                    onPress={() => this.handleEditAddress(item)}
                  >
                    <Text
                      style={{ fontSize: 15, padding: 10, alignSelf: "center" }}
                    >
                      Edit
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      borderColor: "black",
                      alignSelf: "center",
                    }}
                    onPress={async () => await this.handleDeleteAddress(item)}
                  >
                    <Text
                      style={{ fontSize: 15, padding: 10, alignSelf: "center" }}
                    >
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            numColumns={1}
          />
          <View
            style={{
              alignSelf: "center",
              borderColor: "black",
              borderWidth: 2,
              width: "40%",
              alignItems: "center",
              padding: 10,
              marginTop: 30,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("AddNewAddress", {
                  handleClose: async function (navigation, addresses) {
                    await this.setState({
                      address: addresses,
                    });
                    navigation.navigate("ManageAddress");
                  }.bind(this),
                });
              }}
            >
              <Text style={{ alignSelf: "center" }}>Add New Address</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user.user };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateUserProfileToStore,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ManageAddress);
