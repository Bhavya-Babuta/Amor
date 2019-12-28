import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import { onFailure, onSuccess, isUserLoggedIn } from "../../../../helper";
import styles from "./styles";
import { Auth } from "aws-amplify";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.onSuccess = onSuccess.bind(this);
    this.onFailure = onFailure.bind(this);
    this.isUserLoggedIn = isUserLoggedIn.bind(this);
  }

  setEmail = value => {
    this.setState({ email: value });
  };

  setPassword = value => {
    this.setState({ password: value });
  };

  handleSign = async () => {
    try {
      console.log("In Handle sign in");
      const { email, password } = this.state;
      if (email) {
        console.log("Signing in user");
        const cognitoUser = await Auth.signIn(email, password).catch(error => {
          console.log("Error: ", error);
        });
        console.log("Cognito User: ", cognitoUser);
        if (cognitoUser.challengeName === "NEW_PASSWORD_REQUIRED") {
          this.props.navigation.navigate("NewPassword", { user: cognitoUser });
        } else {
          console.log("Success: ", cognitoUser);
          this.onSuccess(cognitoUser);
        }
      }
    } catch (err) {
      console.log("Error Occured: ", err);
      this.onFailure(err);
    }
  };

  render() {
    const { email, password } = this.state;
    this.isUserLoggedIn();
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flex: 1,
            alignSelf: "flex-start",
            marginTop: 70,
            marginLeft: 40,
            marginBottom: 50
          }}
        >
          <Text style={{ fontSize: 70, color: "white", fontWeight: "200" }}>
            Login
          </Text>
        </View>
        <View style={styles.inputView}>
          <TextInput
            keyboardType="email-address"
            value={email}
            onChangeText={this.setEmail}
            style={styles.email}
            placeholder="E-mail"
            placeholderTextColor="#696969"
          />
          <TextInput
            secureTextEntry={true}
            value={password}
            onChangeText={this.setPassword}
            style={styles.password}
            placeholder="Password"
            placeholderTextColor="#696969"
          />
          <TouchableOpacity
            style={styles.forgotPasswordButton}
            onPress={() => this.props.navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.forgotPasswordButtonText}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
          <View style={{ alignSelf: "center" }}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={this.handleSign}
            >
              <Text style={styles.loginButtonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.newAccountButton}
              onPress={() => this.props.navigation.navigate("SignUp")}
            >
              <Text style={styles.newAccountButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default Login;
