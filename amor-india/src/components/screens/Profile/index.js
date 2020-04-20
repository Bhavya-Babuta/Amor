import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import styles from "./styles";
import GeneralStatusBarColor from "../../components/GeneralStatusBarColor/GeneralStatusBarColor";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import { normalize } from "../../../../helper";
import { Auth } from "aws-amplify";
import { connect } from "react-redux";
import { updateUserProfileToStore } from "../Login/actions";
import { bindActionCreators } from "redux";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      given_name: props.user.given_name || null,
      email: props.user.email || null,
      phone_number: props.user.phone_number || null,
      email_verified: props.user.email_verified || null,
      phone_verified: props.user.phone_verified || null,
      updateDisabled: true,
    };
  }

  async componentDidMount() {
    await this.isUpdateEnabled();
  }

  isUpdateEnabled = async () => {
    const { email, phone_number, given_name } = this.state;
    const { user } = this.props;
    let updatePayload = {};

    if (email !== user.email) {
      updatePayload.email = email;
      this.setState({ updateDisabled: false });
    } else if (phone_number != user.phone_number) {
      updatePayload.phone_number = phone_number;
      this.setState({ updateDisabled: false });
    } else if (given_name !== user.given_name) {
      updatePayload.given_name = given_name;
      this.setState({ updateDisabled: false });
    } else {
      this.setState({ updateDisabled: true });
      return { error: "Already upto date" };
    }
    if (!email || !given_name || email === "" || given_name === "") {
      this.setState({ updateDisabled: true });
    }
    return updatePayload;
  };

  updateUserProfile = async () => {
    const { user } = this.props;
    let updatePayload = await this.isUpdateEnabled(user);
    if (updatePayload.error) {
      this.setState({ errorMessage: updatePayload.error });
      return { error: updatePayload.error };
    }
    return Auth.currentAuthenticatedUser().then(async (user) => {
      return await Auth.updateUserAttributes(user, updatePayload)
        .then(async (result) => {
          this.props.updateUserProfileToStore(updatePayload);
          await this.isUpdateEnabled();
          return result;
        })
        .catch((error) => {
          this.setState({ errorMessage: error.message });
        });
    });
  };

  render() {
    const {
      given_name,
      email,
      phone_number,
      email_verified,
      address,
      updateDisabled,
    } = this.state;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <GeneralStatusBarColor
            backgroundColor="#253037"
            barStyle="light-content"
          />
          <View style={styles.headerContent}>
            <Image
              style={styles.avatar}
              source={{
                uri: "https://bootdey.com/img/Content/avatar/avatar6.png",
              }}
            />

            <Text style={styles.name}>{this.props.user.given_name}</Text>
            <Text style={styles.userInfo}>{this.props.user.email} </Text>
            <Text style={styles.userInfo}>{this.props.user.phone_number}</Text>
          </View>

          <View
            style={{ marginLeft: 40, marginBottom: 25, marginTop: 10, flex: 5 }}
          >
            <View>
              <View>
                <Text style={{ fontSize: 16 }}>Name</Text>
                <TextInput
                  keyboardType="default"
                  value={given_name}
                  onChangeText={async (value) => {
                    await this.setState({ given_name: value });
                    await this.isUpdateEnabled();
                  }}
                  style={styles.textField}
                  placeholder="Enter name"
                  placeholderTextColor="#696969"
                />
              </View>
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Text>Email</Text>
                  <Text
                    style={{
                      marginLeft: "2%",
                      marginTop: "0.5%",
                      fontSize: 12,
                      color: email_verified ? "green" : "black",
                      textDecorationLine: email_verified ? "none" : "underline",
                    }}
                  >
                    {email_verified ? "Verified" : "Verify E-Mail"}
                  </Text>
                </View>
                <TextInput
                  keyboardType="email-address"
                  value={email}
                  onChangeText={async (value) => {
                    await this.setState({ email: value });
                    await this.isUpdateEnabled();
                  }}
                  style={styles.textField}
                  placeholder="Enter E-mail"
                  placeholderTextColor="#696969"
                  autoCompleteType="tel"
                />
              </View>
              <View>
                <Text>Phone Number</Text>
                <TextInput
                  keyboardType="number-pad"
                  value={phone_number}
                  onChangeText={async (value) => {
                    await this.setState({ phone_number: value });
                    await this.isUpdateEnabled();
                  }}
                  style={styles.textField}
                  placeholder="Enter phone number"
                  placeholderTextColor="#696969"
                  autoCompleteType="tel"
                />
              </View>
            </View>
          </View>
          <View style={{ width: 400, marginTop: 30 }}>
            <TouchableOpacity
              style={{ flexDirection: "row", alignSelf: "center" }}
              onPress={() => {
                this.props.navigation.navigate("ManageAddress", {
                  address,
                });
              }}
            >
              <AntDesignIcons name="home" size={normalize(15)}></AntDesignIcons>
              <Text
                style={{
                  flexDirection: "column",
                  marginTop: 2,
                  fontSize: normalize(15),
                }}
              >
                Manage Addresses
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={[
                styles.saveButton,
                {
                  borderColor: updateDisabled ? "#cdcdcd" : "#000000",
                },
              ]}
              onPress={async () => {
                await this.updateUserProfile();
              }}
              disabled={updateDisabled}
            >
              <Text
                style={{
                  alignSelf: "center",
                  padding: 15,
                  fontSize: 18,
                  color: updateDisabled ? "#cdcdcd" : "#000000",
                }}
              >
                Save Changes
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
