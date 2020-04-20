import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { onFailure, onSuccess, isUserLoggedIn } from "../../../../helper";
import styles from "./styles";
import { Auth } from "aws-amplify";
import { connect } from "react-redux";
import { addUserProfileToStore } from "./actions";
import { bindActionCreators } from "redux";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      keyboardVisible: false,
    };
    this.onSuccess = onSuccess.bind(this);
    this.onFailure = onFailure.bind(this);
    this.isUserLoggedIn = isUserLoggedIn.bind(this);
  }

  componentDidMount() {
    this.isUserLoggedIn();

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

  componentDidUpdate() {
    this.isUserLoggedIn();
  }

  setEmail = (value) => {
    this.setState({ email: value });
  };

  setPassword = (value) => {
    this.setState({ password: value });
  };

  handleSign = async () => {
    try {
      const { email, password } = this.state;
      if (email) {
        const cognitoUser = await Auth.signIn(email, password).catch(
          (error) => {
            console.log("Error: ", error);
          }
        );
        if (cognitoUser.challengeName === "NEW_PASSWORD_REQUIRED") {
          this.props.navigation.navigate("NewPassword", { user: cognitoUser });
        } else {
          this.onSuccess(cognitoUser);
          this.props.addUserProfileToStore(cognitoUser.attributes);
        }
      }
    } catch (err) {
      console.log("Error Occured: ", err);
      this.onFailure(err);
    }
  };

  render() {
    const { email, password, keyboardVisible } = this.state;
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
            <Text style={styles.mainText}>Login</Text>
          </View>
          <View
            style={
              keyboardVisible ? styles.inputViewKeyboard : styles.inputView
            }
          >
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
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addUserProfileToStore,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);
