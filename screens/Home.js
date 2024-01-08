import React, { useContext, useEffect, useRef } from "react";
import {
  Animated,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  TextField2,
  Typography,
  UIThemeContext,
  useColors,
} from "../src/Hoddy-ui";

import { Feather, Ionicons } from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";
import Row from "../components/custom/Row";
import { GLobalContext } from "../src/context";
import { getCart } from "../src/context/actions/cart";
import { GetAllProducts } from "../src/context/actions/products";
import ItemCard from "../components/products/ItemCard";
import {
  ACCOUNT,
  MYDETAILS,
  PRODUCT_DETAILS,
  VIEWBYCATEGORY,
  VIEWPRODUCTS,
} from "../src/navigation/routes";
import Account from "./account/Account";
import { ThemeContext } from "react-native-elements";

function Home({ navigation }) {
  const {
    authState: { data, loading, loggedIn },
    productDispatch,
    productState,
    promotionState,
    categoryState,
    cartState,
    cartDispatch,
  } = React.useContext(GLobalContext);
const {themeState:{value,mode}}= useContext(UIThemeContext)
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000, // adjust the duration as needed
        useNativeDriver: false, // make sure to set useNativeDriver to false for non-native animations
      })
    ).start();
  }, [animatedValue]);

  const marginLeft = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10], // adjust the distance the arrow moves
  });
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    GetAllProducts(productDispatch);
    getCart(cartDispatch);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const colors = useColors();

  const styles = ScaledSheet.create({
    root: {
      flex: 1,
      backgroundColor:"#000",
      // paddingHorizontal: "10@s",
      marginTop: "10@vs",
    },
  
    header: {
      backgroundColor:  colors.white[2],
      // minHeight: "0@vs",
      marginTop: "-3%",
  
      padding: "15@s",
      paddingTop: "36@vs",
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    search: {
      backgroundColor: "#fff",
      marginTop: "-3%",
      padding: "15@s",
      paddingTop: "1@vs",
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    content: {
      flex: 1,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      backgroundColor: colors.white[2],
      marginTop: 10,
      paddingTop: 30,
      padding: "15@s",
      minHeight: "100%",
    },
    banner: {
      height: 70,
      width: "100%",
      resizeMode: "cover",
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
    },
    categoryState: {
      padding: 10,
      backgroundColor: colors.white[4],
      borderRadius: 150,
      width: 70,
      height: 70,
      justifyContent: "center",
      alignItems: "center",
    },
  
    icon: {
      padding: 10,
      backgroundColor:colors.white[4],
      borderRadius: 100,
      width: 60,
      height: 60,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  return (
    <View style={styles.root}>
      <View>
        <ScrollView
        style={{height:"100%"}}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Row justifyContent={"space-between"}mb={17} >
              <TouchableOpacity
                style={styles.icon}
                onPress={() => {
                  navigation.navigate(ACCOUNT);
                }}
              >
                <Feather name="user" size={24} color="black" />
                {loggedIn && (
                  <View
                    style={{
                      position: "absolute",
                      right: -2,
                      top: 0,
                      backgroundColor: colors.primary.main,
                      borderRadius: 20,
                      height: 15,
                      width: 15,
                      flex: 0,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Feather name="check" size={10} color="#fff" />
                  </View>
                )}
              </TouchableOpacity>
              <View>
                <Typography
                  gutterBottom={3}
                  variant="body2"
                  align="center"
                  color="grey"
                >
                  Delivery Address
                </Typography>
                <Typography fontWeight={600} variant="h6">
                  {data?.location?.description || "Login To Gain More"}
                </Typography>
              </View>
              <TouchableOpacity style={styles.icon}>
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </Row>

            {/* <Image source={require("../assets/banner.png")} style={styles.banner} /> */}
          </View>
          {/* <View style={styles.search}>
            {/* <SafeAreaView>
              <TextField2
                style={{ marginTop: 14 }}
                end={<Ionicons name="search-outline" size={24} color="black" />}
                background
                placeholder="Search Dark Store"
              />
            </SafeAreaView> */}
     
          <View style={styles.content}>
            <View style={{ marginBottom: 25 }}>
              <Row mb={20} justifyContent={"space-between"}>
                <Typography variant="h5" fontWeight={700}>
                  Categories
                </Typography>
                <TouchableOpacity>
                  <Row>
                    <Typography fontWeight={500} variant="body2">
                      See all
                    </Typography>
                    <Animated.View style={{ marginRight: marginLeft }}>
                      <Ionicons
                        name="arrow-forward-outline"
                        size={22}
                        color="black"
                      />
                    </Animated.View>
                  </Row>
                </TouchableOpacity>
              </Row>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categoryState?.data?.map((cur, i) => (
                  <TouchableOpacity
                    key={i}
                    style={{ marginRight: 20 }}
                    onPress={() => {
                      navigation.navigate(VIEWBYCATEGORY, { id: cur._id });
                    }}
                  >
                    <View style={styles.categoryState}>
                      <Image
                        source={{ uri: cur.image }}
                        style={{ width: 40, height: 35, resizeMode: "contain" }}
                      />
                    </View>
                    <Typography align="center" variant="body2" fontWeight={500}>
                      {cur.name}
                    </Typography>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <View style={{ marginBottom: 25 }}>
              <Row mb={20} justifyContent={"space-between"}>
                <Typography variant="h5" fontWeight={700}>
                  Popular
                </Typography>
                {/* <TouchableOpacity>
            <Row>
            <Typography fontWeight={500} variant="body2">See all</Typography>
            <Animated.View style={{ marginRight:marginLeft }}>
        <Ionicons name="arrow-forward-outline" size={22} color="black" />
      </Animated.View></Row>
          </TouchableOpacity> */}
              </Row>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {productState?.data?.map((cur, i) => (
                  <ItemCard
                    {...cur}
                    onPress={() => {
                      navigation.navigate(PRODUCT_DETAILS, {
                        productId: cur._id,
                      });
                    }}
                    key={i}
                  />
                ))}
              </ScrollView>
            </View>
            <View style={{ marginBottom: 100 }}>
              <Row mb={20} justifyContent={"space-between"}>
                <Typography variant="h5" fontWeight={700}>
                  Trending
                </Typography>
                {/* <TouchableOpacity>
            <Row>
            <Typography fontWeight={500} variant="body2">See all</Typography>
            <Animated.View style={{ marginRight:marginLeft }}>
        <Ionicons name="arrow-forward-outline" size={22} color="black" />
      </Animated.View></Row>
          </TouchableOpacity> */}
              </Row>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {productState?.data?.map((cur, i) => (
                  <ItemCard {...cur} key={i} />
                ))}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default Home;
