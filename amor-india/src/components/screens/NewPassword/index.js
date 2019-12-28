import React, { Component } from "react";
import {
  SafeAreaView,
  ImageBackground,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Text
} from "react-native";
import styles from "./style";
import { Auth } from "aws-amplify";

class NewPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passsword: null,
      confirmPassword: null
    };
  }
  handlePassword = value => {
    this.setState({ passsword: value });
  };
  handleConfirmPassword = value => {
    this.setState({ confirmPassword: value });
  };
  confirmPasswordSubmit = async () => {
    const { passsword, confirmPassword } = this.state;
    const { navigation } = this.props;
    const user = navigation.getParam("user", null);
    console.log(user);
    if (passsword === confirmPassword && user) {
      console.log("Passowrd === confirmPassword");
      const loggedUser = await Auth.completeNewPassword(
        user, // the Cognito User Object
        passsword // the new password
      );
      console.log("LoggedUser: ", loggedUser);
      if (!loggedUser.challengeName) {
        navigation.navigate("Login");
      }
    } else {
      console.log("Passowrd !== confirmPassword");
    }
  };
  render() {
    const { password, confirmPassword } = this.state;
    return (
      <ImageBackground
        source={require("../../../../assets/images/splash.png")}
        style={styles.background}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.imageView}>
            <Image
              style={styles.logo}
              source={require("../../../../assets/images/splash.png")}
            />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.description}>Set New Password</Text>
            <TextInput
              keyboardType="email-address"
              value={password}
              secureTextEntry={true}
              onChangeText={this.handlePassword.bind(this)}
              style={styles.password}
              placeholder="New Password"
              placeholderTextColor="#696969"
            />
            <TextInput
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={this.handleConfirmPassword.bind(this)}
              style={[styles.password, styles.confirmPassword]}
              placeholder="Confirm Password"
              placeholderTextColor="#696969"
            />
          </View>
          <View style={styles.buttons}>
            <View>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={this.confirmPasswordSubmit}
              >
                <Text style={styles.loginButtonText}>Confirm New Password</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default NewPassword;
