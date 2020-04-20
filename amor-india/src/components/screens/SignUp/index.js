import React, { Component } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { Auth } from "aws-amplify";
import styles from "./styles";
import defaultStyles from "../../../../styles";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      password: null,
      cPassword: null,
      email: null,
      keyboardVisible: false,
    };
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow.bind(this)
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide.bind(this)
    );
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {
    this.setState({ keyboardVisible: true });
  }

  _keyboardDidHide() {
    this.setState({ keyboardVisible: false });
  }

  handleSignUp = async () => {
    const { password, cPassword, email, firstName, lastName } = this.state;
    if (
      password &&
      cPassword &&
      cPassword === password &&
      lastName &&
      firstName &&
      email
    ) {
      const signUp = await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          email: email,
          given_name: `${firstName} ${lastName}`,
        },
      });
      if (signUp) {
        const { navigation } = this.props;
        navigation.navigate("OtpSignup", { username: email });
      }
    } else {
      console.log("Invalid");
    }
  };

  handleFirstNameChange = (value) => {
    this.setState({ firstName: value });
  };
  handleLastNameChange = (value) => {
    this.setState({ lastName: value });
  };
  handleEmailChange = (value) => {
    this.setState({ email: value });
  };
  handlePasswordChange = (value) => {
    this.setState({ password: value });
  };
  handleConfirmPasswordChange = (value) => {
    this.setState({ cPassword: value });
  };
  render() {
    const {
      password,
      cPassword,
      email,
      firstName,
      lastName,
      keyboardVisible,
    } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container}>
        <SafeAreaView>
          <View
            style={[
              styles.mainTextContainer,
              keyboardVisible
                ? styles.mainTextContainerMarginKeyBoard
                : styles.mainTextContainerMargin,
            ]}
          >
            <Text style={styles.mainText}>Signup</Text>
          </View>
          <View
            style={
              keyboardVisible ? styles.inputViewKeyboard : styles.inputView
            }
          >
            <TextInput
              placeholder="First Name"
              value={firstName}
              style={styles.inputField}
              onChangeText={this.handleFirstNameChange}
              placeholderTextColor="#696969"
            />
            <TextInput
              placeholder="Last Name"
              value={lastName}
              style={styles.inputField}
              onChangeText={this.handleLastNameChange}
              placeholderTextColor="#696969"
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={this.handleEmailChange}
              style={styles.inputField}
              keyboardType="email-address"
              placeholderTextColor="#696969"
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={this.handlePasswordChange}
              style={styles.inputField}
              secureTextEntry={true}
              placeholderTextColor="#696969"
            />
            <TextInput
              placeholder="Confirm Password"
              value={cPassword}
              onChangeText={this.handleConfirmPasswordChange}
              style={styles.inputField}
              secureTextEntry={true}
              placeholderTextColor="#696969"
            />
            <View style={styles.buttonView}>
              <TouchableOpacity
                style={styles.button}
                onPress={this.handleSignUp}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}
export default SignUp;
