import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Linking
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import GeneralStatusBarColor from "../../components/GeneralStatusBarColor/GeneralStatusBarColor";

class ContactUs extends Component {
  _handleCall = () => {
    const url = `tel:+917303548585`;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        return Linking.openURL(url).catch(() => null);
      }
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <GeneralStatusBarColor
          backgroundColor="#253037"
          barStyle="light-content"
        />
        <View style={styles.header}>
          <Icon
            name="md-menu"
            size={30}
            style={styles.icon}
            onPress={() => this.props.navigation.openDrawer()}
          />
          <Image
            source={require("../../../../assets/images/amorbranding-white.jpg")}
            style={styles.background}
          ></Image>
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ width: "100%" }}>
            <Text style={{ fontSize: 25, marginTop: 20, alignSelf: "center" }}>
              Get in touch with us
            </Text>
            <Text style={{ fontSize: 20, marginTop: 20, alignSelf: "center" }}>
              We value your opinion
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={{ marginTop: 90 }}>
          <TouchableOpacity
            style={{
              borderWidth: 2,
              borderColor: "black",
              width: "60%",
              alignSelf: "center"
            }}
          >
            <Text
              style={{ padding: 20, alignSelf: "center" }}
              onPress={() => Linking.openURL("mailto:support@example.com")}
            >
              Mail: care@amorindia.com
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderWidth: 2,
              borderColor: "black",
              width: "60%",
              alignSelf: "center",
              marginTop: 50
            }}
          >
            <Text
              style={{ padding: 20, alignSelf: "center" }}
              onPress={this._handleCall}
            >
              Phone: +917303548585
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
export default ContactUs;
