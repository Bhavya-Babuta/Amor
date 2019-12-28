import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

class AuthLoadingScreen extends Component {
  componentDidMount = async () => {
    // await this.loadApp();
    // console.log('In AuthLoadingScreen before navigation to Main App')
    this.props.navigation.navigate("AuthStack");
  };
  loadApp = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    console.log("Token: ", userToken);
    this.props.navigation.navigate(userToken ? "TabNav" : "AuthStack");
  };
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#5fd5f5" />
        <Text style={{ fontSize: 20 }}>Please Wait</Text>
      </View>
    );
  }
}
export default AuthLoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
