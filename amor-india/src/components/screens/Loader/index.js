import React, { Component } from "react";
import { View, SafeAreaView } from "react-native";
import AnimatedLoader from "react-native-animated-loader";
import styles from "./styles.js";

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
    };
  }

  render() {
    const { visible } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ alignSelf: "center", marginTop: 300 }}>
          <AnimatedLoader
            visible={visible}
            overlayColor="rgba(0,0,0,75)"
            source={require("../../../../assets/loader.json")}
            animationStyle={styles.lottie}
            speed={1}
          />
        </View>
      </SafeAreaView>
    );
  }
}
export default Loader;
