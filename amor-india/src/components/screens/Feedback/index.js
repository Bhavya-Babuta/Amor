import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import GeneralStatusBarColor from "../../components/GeneralStatusBarColor/GeneralStatusBarColor";

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };
  }

  handleUserFeedback = input => {
    this.setState({ input });
  };
  render() {
    const { input } = this.state;
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
              We value your feedback
            </Text>
            <Text
              style={{
                marginTop: 30,
                fontSize: 20,
                color: "#000000",
                alignSelf: "center"
              }}
            >
              Please give in your thoughts and we shall get back to you as soon
              as possible
            </Text>

            <TextInput
              style={[styles.inputField, styles.inputFieldMargin]}
              value={input}
              onChangeText={this.handleUserFeedback}
              multiline={true}
              // underlineColorAndroid="transparent"
              placeholder="Tell us what you think?"
              style={styles.inputField}
              keyboardType="email-address"
              keyboardShouldPersistTaps="handled"
            />
          </View>
        </TouchableWithoutFeedback>
        <View style={{ marginTop: 50 }}>
          <TouchableOpacity
            style={{
              borderWidth: 2,
              borderColor: "black",
              width: "40%",
              alignSelf: "center"
            }}
          >
            <Text style={{ padding: 20, alignSelf: "center" }}>
              Submit Feedback
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default Feedback;
