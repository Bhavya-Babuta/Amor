import React, { Component } from "react";
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  View,
  Text
} from "react-native";
import styles from "./styles";
import SearchBarComponent from "../SearchBarComponent";
import GeneralStatusBarColor from "../../components/GeneralStatusBarColor/GeneralStatusBarColor";

class MaleCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: "Tops",
          img: require("../../../../assets/images/temp/categories/Tops.jpeg")
        },
        {
          name: "Two Piece Dresses",
          img: require("../../../../assets/images/temp/shirt.jpg")
        },
        {
          name: "Formal & Casual Shirts",
          img: require("../../../../assets/images/temp/saree.jpg")
        },
        {
          name: "Long Dresses",
          img: require("../../../../assets/images/temp/kurta.jpg")
        },
        {
          name: "Short Dresses",
          img: require("../../../../assets/images/temp/hoodie.jpg")
        },
        {
          name: "Jumpsuits & Playsuits",
          img: require("../../../../assets/images/temp/tshirt.jpg")
        }
      ],
      url: null
    };
  }

  render() {
    const { data, url } = this.state;
    console.log("Url: ", url);

    return (
      <SafeAreaView style={styles.container}>
        <GeneralStatusBarColor
          backgroundColor="#253037"
          barStyle="light-content"
        />
        <SearchBarComponent />
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                overflow: "hidden",
                flex: 1
                // shadowOpacity: 0.23,
                // shadowRadius: 2.62,
                // elevation: 4,
              }}
              onPress={() =>
                this.props.navigation.navigate("ProductList", {
                  filterBy: item.name
                })
              }
            >
              <ImageBackground
                source={item.img}
                style={{
                  height: 200,
                  resizeMode: "cover"
                }}
              >
                <View style={{ width: "90%", alignSelf: "auto" }}>
                  <Text
                    style={{
                      marginTop: "40%",
                      marginLeft: 10,
                      fontSize: 35,
                      color: "#CDCDCD",
                      fontWeight: "700"
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    );
  }
}
export default MaleCategories;
