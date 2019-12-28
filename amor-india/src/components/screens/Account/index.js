import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar
} from "react-native";
import { Auth } from "aws-amplify";
import Icon from "react-native-vector-icons/Ionicons";

class Account extends Component {
  handleLogout = async () => {
    await Auth.signOut();
    const { navigation } = this.props;
    navigation.navigate("Login");
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Icon
              name="md-menu"
              size={30}
              style={styles.icon}
              onPress={() => this.props.navigation.openDrawer()}
            />
          </View>
          <Text style={{ fontSize: 30 }}>Account</Text>
          <TouchableOpacity
            onPress={this.handleLogout}
            style={{ marginTop: 10 }}
          >
            <Text style={{ fontSize: 20, color: "red" }}>LOGOUT</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  icon: { paddingLeft: 10 },
  header: {
    flexDirection: "row",
    width: "100%",
    height: 60,
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderBottomColor: "#CDCDCD",
    borderBottomWidth: 0.5
  },
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#ffffff"
  }
});
