import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class AddressList extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize:30}}>AddressList</Text>
            </View>
        );
    }
}
export default AddressList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});