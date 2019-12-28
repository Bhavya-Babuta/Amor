import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  Platform,
  SafeAreaView,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Auth } from "aws-amplify";
import styles from "./styles";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      newPassword: "",
      code: "",
      confirmationCode: false,
      error: "",
      cPassword: ""
    };
  }
  setEmail = value => {
    this.setState({ email: value });
  };

  setPassword = value => {
    this.setState({ newPassword: value });
  };

  setConfirmPassword = value => {
    this.setState({ cPassword: value });
  };

  setCode = value => {
    this.setState({ code: value });
  };

  handleFieldRender = () => {
    const {
      confirmationCode,
      email,
      code,
      newPassword,
      cPassword
    } = this.state;
    if (confirmationCode) {
      return (
        <View style={styles.inputView}>
          <TextInput
            keyboardType="email-address"
            value={email}
            onChangeText={this.setEmail}
            style={styles.email}
            placeholder="E-mail address"
            placeholderTextColor="#696969"
          />
          <TextInput
            secureTextEntry={true}
            value={newPassword}
            onChangeText={this.setPassword}
            style={styles.email}
            placeholder="New Password"
            placeholderTextColor="#696969"
          />
          <TextInput
            secureTextEntry={true}
            value={cPassword}
            onChangeText={this.setConfirmPassword}
            style={styles.email}
            placeholder="Confirm Password"
            placeholderTextColor="#696969"
          />
          <TextInput
            keyboardType="email-address"
            value={code}
            onChangeText={this.setCode}
            style={styles.email}
            placeholder="Confirmation Code Received on Email"
            placeholderTextColor="#696969"
          />
        </View>
      );
    } else {
      return (
        <View style={styles.inputView}>
          <TextInput
            keyboardType="email-address"
            value={this.state.email}
            onChangeText={this.setEmail}
            style={styles.email}
            placeholder="E-mail address"
            placeholderTextColor="#696969"
          />
        </View>
      );
    }
  };

  handleConfirmPasswordSubmit = async () => {
    const {
      confirmationCode,
      email,
      cPassword,
      newPassword,
      code
    } = this.state;
    if (email && !confirmationCode) {
      try {
        const forgotPassword = await Auth.forgotPassword(email);
        this.setState({ confirmationCode: true });
        console.log("Forgot Password: ", forgotPassword);
      } catch (error) {
        console.log("Error in 1: ", error);
      }
    } else if (!email) {
      console.log("Email Not Present");
    }
    if (
      confirmationCode &&
      newPassword &&
      cPassword &&
      code &&
      newPassword === cPassword
    ) {
      console.log("Final Submit");
      const forgotPasswordResult = await Auth.forgotPasswordSubmit(
        email,
        code,
        newPassword
      );
      console.log("Forgot Password Result: ", forgotPasswordResult);
    }
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flex: 2,
            alignSelf: "flex-start",
            marginTop: 70,
            marginLeft: 40,
            marginBottom: 18
          }}
        >
          <Text style={{ fontSize: 70, color: "white", fontWeight: "200" }}>
            Forgot {"\n"}Password
          </Text>
        </View>
        {this.handleFieldRender()}
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleConfirmPasswordSubmit}
          >
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </View>
        {/* </KeyboardAvoidingView> */}
      </SafeAreaView>
    );
  }
}
export default ForgotPassword;
