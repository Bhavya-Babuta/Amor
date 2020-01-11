import React, { Component } from "react";
import { CheckBox } from 'react-native-elements'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
  Image,
  Button,
  Platform,
  StatusBar,
  Modal
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import SearchBarComponent from "../../screens/SearchBarComponent";
import GeneralStatusBarColor from "../../components/GeneralStatusBarColor/GeneralStatusBarColor";
import { TouchableOpacity } from "react-native-gesture-handler";
const { normalize } = require("../../../../helper");
import Icon from "react-native-vector-icons/MaterialIcons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;

const data = [
  {
    id: 1,
    product_name: "Product A",
    img: require("../../../../assets/images/temp/LongDresses/3.jpg"),
    product_color: "Black",
    price: 240,
    availableSizes: ["S", "M", "L"]
  },
  {
    id: 2,
    product_name: "Product A",
    img: require("../../../../assets/images/temp/FormalCasualShirts/edited35.jpg"),
    product_color: "Black",
    price: 330,
    availableSizes: ["S", "M", "L"]
  },
  {
    id: 3,
    product_name: "Product A",
    img: require("../../../../assets/images/temp/FormalCasualShirts/edited44.jpg"),
    product_color: "Black",
    price: 242,
    availableSizes: ["S", "M", "L"]
  },
  {
    id: 4,
    product_name: "Product A",
    img: require("../../../../assets/images/temp/FormalCasualShirts/edited74.jpg"),
    product_color: "Black",
    price: 100,
    availableSizes: ["S", "M", "L"]
  },
  {
    id: 5,
    product_name: "Product A",
    img: require("../../../../assets/images/temp/FormalCasualShirts/edited.jpg"),
    product_color: "Black",
    price: 390,
    availableSizes: ["S", "M", "L"]
  },
  {
    id: 6,
    product_name: "Product A",
    img: require("../../../../assets/images/temp/FormalCasualShirts/edited.jpg"),
    product_color: "Black",
    price: 260,
    availableSizes: ["S", "M", "L"]
  },
  {
    id: 7,
    product_name: "Product A",
    img: require("../../../../assets/images/temp/FormalCasualShirts/edited.jpg"),
    product_color: "Black",
    price: 240,
    availableSizes: ["S", "M", "L"]
  },
  {
    id: 8,
    product_name: "Product A",
    img: require("../../../../assets/images/temp/FormalCasualShirts/edited.jpg"),
    product_color: "Black",
    price: 240,
    availableSizes: ["S", "M", "L"]
  },
  {
    id: 9,
    product_name: "Product A",
    img: require("../../../../assets/images/temp/FormalCasualShirts/edited.jpg"),
    product_color: "Black",
    price: 240,
    availableSizes: ["S", "M", "L"]
  },
  {
    id: 10,
    product_name: "Product A",
    img: require("../../../../assets/images/temp/FormalCasualShirts/edited.jpg"),
    product_color: "Black",
    price: 240,
    availableSizes: ["S", "M", "L"]
  },
  {
    id: 11,
    product_name: "Product A",
    img: require("../../../../assets/images/temp/FormalCasualShirts/edited.jpg"),
    product_color: "Black",
    price: 320,
    availableSizes: ["S", "M", "L"]
  }
];
class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: null,
      viewType: "ListView",
      noColumns: 1,
      isVisible: false,
      checked: false
    };
    this.Item = this.Item.bind(this);
  }

  getSizeString = sizeList => {
    let sizeString = "";
    console.log("Size List: ", sizeList);
    sizeList.forEach(element => {
      if (element === "S") {
        sizeString = sizeString + "S, ";
      } else if (element === "M") {
        sizeString = sizeString + "M, ";
      } else {
        sizeString = sizeString + "L";
      }
    });
    console.log("Size String: ", sizeString);
    return sizeString;
  };

  Item = ({ id, src, name, price, sizeString, availableSizes }) => {
    return (
      <TouchableOpacity
        style={styles.productContainer}
        onPress={() =>
          this.props.navigation.navigate("ProductPage", {
            id,
            src,
            name,
            price,
            availableSizes
          })
        }
      >
        <View>
          <Image
            source={src}
            style={{ resizeMode: "stretch", width: 150, height: "100%" }}
          ></Image>
        </View>
        <View style={{ flexDirection: "column", flex: 1 }}>
          <Text
            style={{
              alignSelf: "flex-start",
              marginTop: "10%",
              marginLeft: 25,
              fontSize: normalize(17),
              fontWeight: "500"
            }}
          >
            {name}
          </Text>
          <Text
            style={{ marginLeft: 25, marginTop: 9, fontSize: normalize(12) }}
          >{`Available sizes: ${sizeString}`}</Text>
          <Text
            style={{
              alignSelf: "flex-start",
              marginTop: "28%",
              marginLeft: 25,
              fontSize: normalize(17),
              fontWeight: "600"
            }}
          >{`${`\u20B9`}${price}`}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { noColumns } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <GeneralStatusBarColor
          backgroundColor="#253037"
          barStyle="light-content"
        />
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 10 }}>
            <SearchBarComponent />
          </View>
          <View style={styles.filterBar}>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                marginTop: 10
              }}
            >
                <Modal            
                  animationType = {"fade"}  
                  transparent = {false}  
                  visible = {this.state.isVisible}  
                  onRequestClose = {() =>{ console.log("Modal has been closed.") } }>  
                  {/*All views of Modal*/}  
                  <View style = {styles.modal}>  
                  <Ionicons name="md-close" size={32} color="green" style={{alignSelf: 'flex-end', marginRight: 10}} 
                  onPress = {() => {  
                    this.setState({ isVisible:!this.state.isVisible})}}/>
                  <Text style={{alignSelf: 'center', fontSize: 20 }}>Sort By</Text>
                  <CheckBox title="Price" 
                  checked={this.state.checked}
                  onPress={() => this.setState({checked: !this.state.checked})}></CheckBox>
                  <TouchableOpacity style={{alignSelf: "center", borderRadius: 4, marginTop: 20, padding: 10,
                    borderWidth: 0.5,
                    borderColor: '#d6d7da',}}>
                    <Text>Apply</Text>
                  </TouchableOpacity>
                  </View>  
                </Modal>  
              <View style={{ alignSelf: "center", flex: 1 }}>
                <TouchableOpacity
                  onPress = {() => {this.setState({ isVisible: true})}}  
                  style={
                    ([styles.viewButonStyles],
                    {
                      flexDirection: "row"
                    })
                  }
                >
                  <Icon name="sort" size={35} style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            numColumns={noColumns}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              const sizeString = this.getSizeString(item.availableSizes);
              return (
                <this.Item
                  id={item.id}
                  src={item.img}
                  name={item.product_name}
                  price={item.price}
                  availableSizes={item.availableSizes}
                  sizeString={sizeString}
                ></this.Item>
              );
            }}
          ></FlatList>
        </View>
      </SafeAreaView>
    );
  }
}
export default ProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 0 : -STATUSBAR_HEIGHT,
    backgroundColor: "#ffffff"
  },
  productContainer: {
    height: height * 0.3,
    alignSelf: "center",
    borderWidth: 0.5,
    borderColor: "black",
    width,
    alignContent: "center",
    flexDirection: "row",
    borderColor: "#CDCDCD"
  },
  viewButonStyles: {
    borderColor: "black",
    alignSelf: "center"
  },
  filterBar: {
    flex: 1,
    backgroundColor: "#2a3c3c",
    borderTopWidth: 1
  },
  icon: {
    flex: 1,
    color: "white",
    alignSelf: "center"
  }
});
