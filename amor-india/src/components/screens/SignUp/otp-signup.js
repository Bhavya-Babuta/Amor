import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text
} from "react-native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import styles from "./styles";
import { Auth } from "aws-amplify";

class OtpSignup extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      opt: null,
      username: navigation.getParam("username", null)
    };
  }
  render() {
    const { username } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View
          style={{
            flex: 2,
            alignSelf: "flex-start",
            marginTop: 70,
            marginLeft: 40,
            marginBottom: 18
          }}
        >
          <Text style={{ fontSize: 50, color: "white", fontWeight: "200" }}>
            Enter the code received on your registered email
          </Text>
        </View>
        <View style={styles.inputView}>
          <OTPInputView
            style={{
              marginLeft: 25,
              width: "80%",
              height: 50,
              marginTop: 30
            }}
            pinCount={6}
            code={this.state.code}
            onCodeChanged={code => {
              this.setState({ code });
            }}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={async code => {
              if (username) {
                const confirmSignupResult = await Auth.confirmSignUp(
                  username,
                  code,
                  {
                    forceAliasCreation: true
                  }
                );
                console.log("Confirm: ", confirmSignupResult);
                if (confirmSignupResult === "SUCCESS") {
                  this.props.navigation.navigate("Login");
                }
              }
            }}
          />
          <TouchableOpacity
            style={styles.resendConfirmationCodeButton}
            onPress={async () => {
              await Auth.resendSignUp(username);
            }}
          >
            <Text style={styles.resendConfirmationCode}>
              Resend Confimation Code
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default OtpSignup;
