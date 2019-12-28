import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class AboutUs extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize:30}}>About Us</Text>
            </View>
        );
    }
}
export default AboutUs;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});