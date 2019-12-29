import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  SafeAreaView,
  TouchableOpacity
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
      email: null
    };
  }
  handleSignUp = async () => {
    const { password, cPassword, email, firstName, lastName } = this.state;
    console.log("Password: ", password);
    console.log("Confirm Password: ", cPassword);
    console.log("Email: ", email);
    console.log("First Name: ", firstName);
    console.log("Last Name: ", lastName);
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
          given_name: `${firstName} ${lastName}`
        }
      });
      console.log("Sign Up: ", signUp);
      if (signUp) {
        console.log("Otp screen");
        const { navigation } = this.props;
        navigation.navigate("OtpSignup", { username: email });
      }
    } else {
      console.log("Invalid");
    }
  };

  handleFirstNameChange = value => {
    this.setState({ firstName: value });
  };
  handleLastNameChange = value => {
    this.setState({ lastName: value });
  };
  handleEmailChange = value => {
    this.setState({ email: value });
  };
  handlePasswordChange = value => {
    this.setState({ password: value });
  };
  handleConfirmPasswordChange = value => {
    this.setState({ cPassword: value });
  };
  render() {
    const { password, cPassword, email, firstName, lastName } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.mainTextContainer}>
          <Text style={styles.mainText}>Signup</Text>
        </View>
        <View style={styles.inputView}>
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
            <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
export default SignUp;
