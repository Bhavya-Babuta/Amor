import React, { Component } from "react";
import {
  Text,
  SafeAreaView,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import GeneralStatusBarColor from "../../components/GeneralStatusBarColor/GeneralStatusBarColor";
import { Auth } from "aws-amplify";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateUserProfileToStore } from "../Login/actions";
import { normalize } from "../../../../helper";

class AddNewAddress extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      edit: navigation && navigation.getParam("editAddress") ? true : false,
      editAddress: (navigation && navigation.getParam("editAddress")) || {},
      state:
        (navigation &&
          navigation.getParam("editAddress") &&
          navigation.getParam("editAddress").state) ||
        "",
      city:
        (navigation &&
          navigation.getParam("editAddress") &&
          navigation.getParam("editAddress").city) ||
        "",
      addLine1:
        (navigation &&
          navigation.getParam("editAddress") &&
          navigation.getParam("editAddress").addLine1) ||
        "",
      street:
        (navigation &&
          navigation.getParam("editAddress") &&
          navigation.getParam("editAddress").street) ||
        "",
      zipcode:
        (navigation &&
          navigation.getParam("editAddress") &&
          navigation.getParam("editAddress").zipcode) ||
        "",
      isDefault:
        (navigation &&
          navigation.getParam("editAddress") &&
          navigation.getParam("editAddress").isDefault) ||
        false,
      checkout: (navigation && navigation.getParam("checkout")) || false,

      errorMessage: null,
    };
    this.handleClose = navigation.getParam("handleClose");
  }

  arraysEqual(_arr1, _arr2) {
    if (
      !Array.isArray(_arr1) ||
      !Array.isArray(_arr2) ||
      _arr1.length !== _arr2.length
    )
      return false;
    var arr1 = _arr1.concat().sort();
    var arr2 = _arr2.concat().sort();

    for (var i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }

  validateAddress = async (newAddress) => {
    const { state, city, street, zipcode, addLine1 } = newAddress;
    const address = JSON.parse(this.props.user.address);
    if (address.length === 8) {
      return { error: "Maximum number of  addresses allowed reached" };
    }
    if (!state) {
      return { error: "State is mandatory" };
    }
    if (!city) {
      return { error: "City is mandatory" };
    }
    if (!street) {
      return { error: "Street is mandatory" };
    }
    if (!zipcode) {
      return { error: "Zipcode is mandatory" };
    }
    if (!addLine1) {
      return { error: "Address is mandatory" };
    }
    return true;
  };

  addressExists = (addresses, newAddress) => {
    for (let i = 0; i < addresses.length; i++) {
      if (
        this.arraysEqual(Object.keys(addresses[i]), Object.keys(newAddress)) &&
        this.arraysEqual(Object.values(addresses[i]), Object.values(newAddress))
      ) {
        return i;
      }
    }
    return false;
  };

  addNewAddress = async () => {
    const {
      state,
      city,
      street,
      zipcode,
      addLine1,
      edit,
      editAddress,
    } = this.state;
    const newAddress = {
      state,
      city,
      zipcode,
      street,
      addLine1,
    };
    const addressValidationResult = await this.validateAddress(newAddress);
    if (addressValidationResult && addressValidationResult.error) {
      return addressValidationResult;
    }
    let addresses = JSON.parse(this.props.user.address);
    if (edit) {
      const addressIndex = this.addressExists(addresses, editAddress);
      addresses.splice(addressIndex, 1);
    } else {
      const addressIndex = this.addressExists(addresses, newAddress);
      if (addressIndex) {
        return { error: "Address already exists" };
      }
    }
    addresses.push(newAddress);

    await this.setState({ address: addresses });
    return await Auth.currentAuthenticatedUser()
      .then(
        async (user) =>
          await Auth.updateUserAttributes(user, {
            address: JSON.stringify(addresses),
          })
      )
      .then((result) => {
        this.props.updateUserProfileToStore({
          address: JSON.stringify(addresses),
        });
        return { result, addresses };
      });
  };

  render() {
    const {
      state,
      city,
      zipcode,
      addLine1,
      edit,
      street,
      isDefault,
      checkout,
    } = this.state;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            <View>
              <Text
                style={{
                  marginTop: "1.5%",
                  fontSize: normalize(15),
                }}
              >
                Add New Address
              </Text>
            </View>
            <View style={{ marginRight: 15 }}>
              <TouchableOpacity
                onPress={async () => {
                  await this.handleClose(
                    this.props.navigation,
                    checkout,
                    JSON.parse(this.props.user.address)
                  );
                }}
              >
                <Ionicons name="md-close" size={26} color="green" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ alignSelf: "center", marginTop: 25 }}>
            <Text>Apartment/House Number</Text>
            <TextInput
              value={addLine1}
              style={styles.textInput}
              placeholder="Apartment/House Number"
              placeholderTextColor="#696969"
              onChangeText={(addLine1) => {
                this.setState({ addLine1 });
              }}
            />
            <Text>Street Name</Text>
            <TextInput
              value={street}
              style={styles.textInput}
              placeholder="Street Name"
              placeholderTextColor="#696969"
              onChangeText={(street) => {
                this.setState({ street });
              }}
            />
            <Text>State</Text>
            <TextInput
              value={state}
              style={styles.textInput}
              placeholder="State"
              placeholderTextColor="#696969"
              onChangeText={(state) => {
                this.setState({ state });
              }}
            />
            <Text>City</Text>
            <TextInput
              style={styles.textInput}
              value={city}
              placeholder="City"
              placeholderTextColor="#696969"
              onChangeText={(city) => {
                this.setState({ city });
              }}
            />
            <Text>Zipcode</Text>
            <TextInput
              value={zipcode}
              style={styles.textInput}
              placeholder="Zipcode"
              placeholderTextColor="#696969"
              keyboardType="numeric"
              autoCompleteType="postal-code"
              maxLength={6}
              onChangeText={(zipcode) => {
                this.setState({ zipcode });
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 10,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: normalize(10),
                  padding: 15,
                  alignSelf: "center",
                }}
              >
                Set As Default
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity
                style={{
                  alignSelf: "center",
                  padding: 15,
                  backgroundColor: isDefault ? "#CDCDCD" : "white",
                }}
                onPress={async () => await this.setState({ isDefault: true })}
              >
                <Text>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignSelf: "center",
                  padding: 15,
                  backgroundColor: !isDefault ? "#CDCDCD" : "white",
                }}
                onPress={async () => await this.setState({ isDefault: false })}
              >
                <Text>No</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginTop: 25 }}>
            <TouchableOpacity
              style={[styles.proceedButton]}
              onPress={async () => {
                const { result, addresses, error } = await this.addNewAddress();
                if (error) {
                  this.setState({ error: error });
                } else {
                  this.handleClose(this.props.navigation, addresses);
                }
              }}
            >
              <Text style={styles.proceedText}>
                {edit ? "Save Address" : "Add New Address"}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddNewAddress);
