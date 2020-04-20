import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import styles from "./styles";
import Swiper from "react-native-swiper";
import SearchBarComponent from "../SearchBarComponent";
import GeneralStatusBarColor from "../../components/GeneralStatusBarColor/GeneralStatusBarColor";
import axios from "axios";
import { normalize } from "react-native-elements";
import Loader from "../Loader";
// import Image from "react-native-image-progress";
import { connect } from "react-redux";
import uuid from "uuid/v4";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      activeIndex: 0,
      categories: null,
      featuredProducts: [],
      bannerImages: [],
      loading: true,
      imageLoading: [],
    };
  }

  Item({ item, index }) {
    return (
      <TouchableOpacity style={styles.topCategories}>
        <Image style={styles.topCategoriesImage} source={item.img} />
        <Text style={styles.topCategoriesName}>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  async componentDidMount() {
    const categoriesResult = await axios.get(
      "https://8h6jihqtuj.execute-api.ap-south-1.amazonaws.com/dev/v1/categories"
    );
    await this.setState({ categories: categoriesResult.data.data.categories });
    const featuredProductsResult = await axios.get(
      "https://8h6jihqtuj.execute-api.ap-south-1.amazonaws.com/dev/v1/products?featured=1"
    );
    await this.setState({ featuredProducts: featuredProductsResult.data.data });
    const bannerImages = await this.getBannerImages();
    await this.setState({ bannerImages });
    await this.setState({ loading: false });
  }

  getBannerImages = async () => {
    return await axios
      .get(
        "https://8h6jihqtuj.execute-api.ap-south-1.amazonaws.com/dev/v1/home/banner"
      )
      .then((result) => result.data.data.retval);
  };

  getSwiperImages = () => {
    const { bannerImages } = this.state;
    return bannerImages.map((element) => {
      return (
        <View style={styles.slide1}>
          <Image
            style={styles.image}
            source={{
              uri: element.bannerImageSrc,
              headers: { "Accept-Encoding": "gzip" },
            }}
          ></Image>
        </View>
      );
    });
  };

  render() {
    const { categories, featuredProducts, bannerImages, loading } = this.state;
    if (loading) {
      return <Loader visible={loading}></Loader>;
    }
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
          key={uuid()}
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
            {bannerImages && bannerImages.length > 0 ? (
              <Swiper
                showsButtons={false}
                autoplay={true}
                paginationStyle={{ marginTop: 100 }}
                loop={true}
                key={uuid()}
              >
                <View style={styles.slide1}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: bannerImages[0].bannerImageSrc,
                      headers: { "Accept-Encoding": "gzip" },
                    }}
                  ></Image>
                </View>
                <View style={styles.slide1}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: bannerImages[1].bannerImageSrc,
                      headers: { "Accept-Encoding": "gzip" },
                    }}
                  ></Image>
                </View>
                <View style={styles.slide1}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: bannerImages[2].bannerImageSrc,
                      headers: { "Accept-Encoding": "gzip" },
                    }}
                  ></Image>
                </View>
              </Swiper>
            ) : (
              []
            )}
          </View>
          <Text style={styles.topText}>Browse by Categories</Text>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.category_id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() =>
                  this.props.navigation.navigate("ProductListHome", {
                    category: item.category_name,
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
                    fontWeight: "500",
                  }}
                >
                  {item.category_name}
                </Text>
              </TouchableOpacity>
            )}
            numColumns={2}
          />
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.topText}>Star Products</Text>
            {featuredProducts.length !== 0 ? (
              <FlatList
                data={featuredProducts}
                numColumns={2}
                style={styles.highlightedProductsFlatlist}
                columnWrapperStyle={
                  styles.highlightedProductsFlatlistColumnWrapper
                }
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      style={styles.highlightedProducts}
                      onPress={() => {
                        this.props.navigation.navigate("ProductPageHome", {
                          item,
                        });
                      }}
                    >
                      {item.src ? (
                        <Image
                          style={styles.highlightedProductsImage}
                          source={{
                            uri: `https://d182bv3lioi4mj.cloudfront.net${item.src[0]}`,
                            headers: { "Accept-Encoding": "gzip" },
                          }}
                        />
                      ) : null}
                      <View
                        style={{
                          flex: 1,
                          justifyContent: "space-evenly",
                          alignItems: "center",
                          padding: 5,
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
              />
            ) : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, null)(Home);
