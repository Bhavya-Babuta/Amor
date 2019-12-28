import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Login from "../../screens/Login";
import ForgotPassword from "../../screens/ForgotPassword";
import SignUp from "../../screens/SignUp";
import NewPassword from "../../screens/NewPassword";
import OtpSignup from "../../screens/SignUp/otp-signup";
const Auth = createStackNavigator(
  {
    Login: { screen: Login },
    ForgotPassword: { screen: ForgotPassword },
    SignUp: { screen: SignUp },
    NewPassword: { screen: NewPassword },
    OtpSignup: { screen: OtpSignup }
  },
  {
    headerMode: "none",
    initialRouteName: "Login"
  }
);

const AuthStack = createAppContainer(Auth);
export default AuthStack;
