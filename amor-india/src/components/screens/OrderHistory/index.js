import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class OrderHistory extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>OrderHistory</Text>
            </View>
        );
    }
}
export default OrderHistory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});