import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import styles from "./styles";
import Swiper from "react-native-swiper";
import SearchBarComponent from "../SearchBarComponent";
import GeneralStatusBarColor from "../../components/GeneralStatusBarColor/GeneralStatusBarColor";
import axios from "axios";
import { normalize } from "react-native-elements";
const uuid = require("uuid/v4");

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      activeIndex: 0,
      categories: null,
      featuredProducts: []
    };
  }

  _renderItem({ item, index }) {
    return (
      <TouchableOpacity style={styles.topCategories}>
        <Image style={styles.topCategoriesImage} source={item.img} />
        <Text style={styles.topCategoriesName}>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  async componentDidMount() {
    const categoriesResult = await axios.get(
      "https://wq3nngv3ch.execute-api.ap-south-1.amazonaws.com/dev/v1/categories"
    );
    this.setState({ categories: categoriesResult.data.data.categories });
    const featuredProductsResult = await axios.get(
      "https://wq3nngv3ch.execute-api.ap-south-1.amazonaws.com/dev/v1/products/?filterBy=featured"
    );
    console.log("FeaturedProducts: ", featuredProductsResult.data.data);
    this.setState({ featuredProducts: featuredProductsResult.data.data });
  }

  render() {
    const { categories, featuredProducts } = this.state;
    console.log("Featured products here: ", featuredProducts);
    return (
      <SafeAreaView style={styles.container}>
        <GeneralStatusBarColor
          backgroundColor="#253037"
          barStyle="light-content"
        />
        <ScrollView
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[1]}
        >
          <View style={styles.header}>
            <Icon
              name="md-menu"
              size={30}
              style={styles.icon}
              onPress={() => this.props.navigation.openDrawer()}
            />
            <Image
              source={require("../../../../assets/images/amorbranding-white.jpg")}
              style={styles.background}
            ></Image>
          </View>
          <SearchBarComponent />
          <View style={styles.wrapper}>
            <Swiper
              showsButtons={false}
              autoplay={true}
              paginationStyle={{ marginTop: 100 }}
            >
              <View style={styles.slide1}>
                <Image
                  style={styles.image}
                  source={require("../../../../assets/images/img710.jpg")}
                ></Image>
              </View>
              <View style={styles.slide2}>
                <Image
                  style={styles.image}
                  source={require("../../../../assets/images/amor-tags.jpg")}
                ></Image>
              </View>
              <View style={styles.slide3}>
                <Image
                  style={styles.image}
                  source={require("../../../../assets/images/amor-jeans.jpg")}
                ></Image>
              </View>
            </Swiper>
          </View>
          <Text style={styles.topText}>Browse by Categories</Text>
          <FlatList
            data={categories}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() =>
                  this.props.navigation.navigate("ProductListHome", {
                    filterBy: item.category_name
                  })
                }
              >
                <Text
                  style={{
                    padding: 5,
                    paddingBottom: 18,
                    paddingTop: 18,
                    alignSelf: "center",
                    fontSize: normalize(10),
                    fontWeight: "500"
                  }}
                >
                  {item.category_name}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
            numColumns={2}
          />
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.topText}>Star Products</Text>
            {featuredProducts.length !== 0 ? (
              <FlatList
                data={featuredProducts}
                //   horizontal={true}
                //   showsHorizontalScrollIndicator={true}
                numColumns={2}
                style={styles.highlightedProductsFlatlist}
                columnWrapperStyle={
                  styles.highlightedProductsFlatlistColumnWrapper
                }
                renderItem={({ item }) => {
                  console.log("Item: ", item);
                  return (
                    <TouchableOpacity
                      style={styles.highlightedProducts}
                      onPress={() => {
                        this.props.navigation.navigate("ProductPageHome", {
                          name: item.name,
                          src: item.src,
                          name: item.name,
                          availableSizes: item.availableSizes,
                          price: item.price
                        });
                      }}
                    >
                      {item.src ? (
                        <Image
                          style={styles.highlightedProductsImage}
                          source={{
                            uri: item.src[0],
                            headers: { "Content-Encoding": "gzip" }
                          }}
                        />
                      ) : null}
                      <View
                        style={{
                          flex: 1,
                          height: 70
                        }}
                      >
                        <Text style={styles.nameText}>{item.name}</Text>
                        <Text style={styles.priceText}>
                          {`${`\u20B9`}${item.price}`}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item, index) => uuid()}
              />
            ) : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
export default Home;
