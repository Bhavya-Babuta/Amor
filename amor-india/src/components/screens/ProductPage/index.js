import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class ProductPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize:30}}>ProductPage</Text>
            </View>
        );
    }
}
export default ProductPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});