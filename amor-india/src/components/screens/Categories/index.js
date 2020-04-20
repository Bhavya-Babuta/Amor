import React, { Component } from "react";
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  View,
  Text,
} from "react-native";
import styles from "./styles";
import SearchBarComponent from "../SearchBarComponent";
import GeneralStatusBarColor from "../../components/GeneralStatusBarColor/GeneralStatusBarColor";
import axios from "axios";
import Loader from "../Loader";
import { normalize } from "../../../../helper";
import uuid from "uuid/v4";

class MaleCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      url: null,
      loading: true,
    };
  }

  async componentDidMount() {
    const categories = (await this.getCategories()) || [];
    await this.setState({ categories });
    await this.setState({ loading: false });
  }

  getCategories = async () => {
    return await axios
      .get(
        "https://8h6jihqtuj.execute-api.ap-south-1.amazonaws.com/dev/v1/categories"
      )
      .then((result) => result.data.data.categories);
  };

  render() {
    const { categories, loading } = this.state;
    if (loading) {
      return <Loader visible={loading}></Loader>;
    }
    return (
      <SafeAreaView style={styles.container}>
        <GeneralStatusBarColor
          backgroundColor="#253037"
          barStyle="light-content"
        />
        <SearchBarComponent />
        <FlatList
          data={categories}
          key={uuid()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                overflow: "hidden",
                flex: 1,
              }}
              onPress={() =>
                this.props.navigation.navigate("ProductList", {
                  category: item.category_name,
                })
              }
            >
              <ImageBackground
                source={{
                  uri: `https://d182bv3lioi4mj.cloudfront.net${item.category_image_key}`,
                  headers: { "Accept-Encoding": "gzip" },
                }}
                style={{
                  height: 200,
                  resizeMode: "cover",
                }}
              >
                <View style={{ width: "95%", justifyContent: "center" }}>
                  <Text
                    style={{
                      marginTop: "35%",
                      marginLeft: 5,
                      fontSize: normalize(25),
                      color: "#CDCDCD",
                      fontWeight: "700",
                    }}
                  >
                    {item.category_name}
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
