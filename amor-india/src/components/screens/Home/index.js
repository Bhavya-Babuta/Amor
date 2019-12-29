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
      categories: null
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

  async componentWillMount() {
    const response = await axios.get(
      "https://fojusa5sl3.execute-api.ap-south-1.amazonaws.com/dev/v1/categories"
    );
    this.setState({ categories: response.data.data.categories });
  }

  render() {
    const data = [
      {
        id: "a",
        name: "Formal & Casual Shirts",
        src: require("../../../../assets/images/temp/FormalCasualShirts/edited.jpg"),
        price: "400",
        availableSizes: ["S", "M", "L"]
      },
      {
        id: "b",
        name: "Two Piece Dresses",
        src: require("../../../../assets/images/temp/TwoPieceDresses/11.jpg"),
        price: "800",
        availableSizes: ["S", "M", "L"]
      },
      {
        id: "c",
        name: "Tops",
        src: require("../../../../assets/images/temp/Tops/edited7.jpg"),
        price: "600",
        availableSizes: ["S", "M", "L"]
      },
      {
        id: "d",
        name: "Long Dresses",
        src: require("../../../../assets/images/temp/LongDresses/3.jpg"),
        price: "300",
        availableSizes: ["S", "M", "L"]
      },
      {
        id: "e",
        name: "Short Dresses",
        src: require("../../../../assets/images/temp/ShortDresses/1.jpg"),
        price: "900",
        availableSizes: ["S", "M", "L"]
      },
      {
        id: "f",
        name: "Jumpsuits & Playsuits",
        src: require("../../../../assets/images/temp/JumpsuitPlaysuit/edited43.jpg"),
        price: "1400",
        availableSizes: ["S", "M", "L"]
      }
    ];
    const { categories } = this.state;
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
            {/* <Swiper
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
            </Swiper> */}
          </View>
          <Text style={styles.topText}>Browse by Categories</Text>
          <FlatList
            key={uuid()}
            data={categories}
            renderItem={({ item }) => (
              <View style={styles.itemContainer} key={uuid()}>
                <Text
                  style={{
                    padding: 18,
                    alignSelf: "center",
                    fontSize: normalize(9),
                    fontWeight: "500"
                  }}
                  key={uuid()}
                >
                  {item.category_name}
                </Text>
              </View>
            )}
            keyExtractor={item => item.id}
            numColumns={2}
          />
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.topText}>Star Products</Text>
            <FlatList
              data={data}
              //   horizontal={true}
              //   showsHorizontalScrollIndicator={true}
              numColumns={2}
              style={styles.highlightedProductsFlatlist}
              columnWrapperStyle={
                styles.highlightedProductsFlatlistColumnWrapper
              }
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.highlightedProducts}>
                  <Image
                    style={styles.highlightedProductsImage}
                    source={item.src}
                  />
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
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
export default Home;
