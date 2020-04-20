import React, { Component } from "react";
import GeneralStatusBarColor from "../../components/GeneralStatusBarColor/GeneralStatusBarColor";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CheckBox, normalize } from "react-native-elements";
import styles from "./styles";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <GeneralStatusBarColor
          backgroundColor="#253037"
          barStyle="light-content"
        />
        <View style={{}}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 40,
            }}
          >
            <Text
              style={{
                alignContent: "center",
                fontSize: normalize(15),
              }}
            >
              Sort By
            </Text>
            <TouchableOpacity
              style={{}}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Ionicons name="md-close" size={26} color="green" />
            </TouchableOpacity>
          </View>
          <CheckBox
            title="Price"
            checked={this.state.checked}
            onPress={() => this.setState({ checked: !this.state.checked })}
          ></CheckBox>
          <TouchableOpacity
            style={{
              alignSelf: "center",
              borderRadius: 4,
              marginTop: 20,
              padding: 10,
              borderWidth: 0.5,
              borderColor: "#d6d7da",
            }}
          >
            <Text>Apply</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default Filter;
