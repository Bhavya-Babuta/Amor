import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class ContactUs extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize:30}}>Contact Us</Text>
            </View>
        );
    }
}
export default ContactUs;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});