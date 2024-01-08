import React, { useEffect, useRef, useState } from "react";
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
  useColors,
} from "../../src/Hoddy-ui";

import { Feather, Ionicons } from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";
import Row from "../../components/custom/Row";
import { GLobalContext } from "../../src/context";
import { getCart } from "../../src/context/actions/cart";
import { GetAllProducts } from "../../src/context/actions/products";
import ItemCard from "../../components/products/ItemCard";
import {
  PRODUCT_DETAILS,
  VIEWBYCATEGORY,
  VIEWPRODUCTS,
  VIEWPRODUCTSBYBRANDS,
} from "../../src/navigation/routes";
import { ProductSort } from "../../utility";
import client from "../../api/client";
import Divider from "../../components/custom/Divider";

function Shop({ navigation }) {
  const {
    authState: { data, loggedIn },
    productDispatch,
    productState,
    promotionState,
    categoryState,
    cartDispatch,
  } = React.useContext(GLobalContext);
  const [products, setProducts] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [showSearch, setShowSearch] = useState(false);
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
  const [searchResult, setSearchResult] = useState({})
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    GetAllProducts(productDispatch);
    getCart(cartDispatch);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  useEffect(() => {
    setProducts(ProductSort(productState.data));
  }, [productState.data]);
  const searchDarkStore = async()=>{
    try {
      if(searchParam != ""){

      
      const res = (await client.get(`/search?find=${searchParam}`)).data
      
      setSearchResult(res?.data)}
      else{
        setSearchResult({})
      }
    } catch (error) {
     console.log(error) 
    }
  }

  const colors = useColors();
  useEffect(() => {
searchDarkStore()
  }, [searchParam != ""])
  const styles = ScaledSheet.create({
    root: {
      flex: 1,
      backgroundColor: "#000",
      // paddingHorizontal: "10@s",
      marginTop: "10@vs",
    },
  
    header: {
      backgroundColor:  colors.white[2],

      // minHeight: "0@vs",
      marginTop: "-3%",
  
      padding: "15@s",
      paddingTop: "36@vs",
    },
    search: {
      backgroundColor:  colors.white[2],

      marginTop: "-2%",
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
      backgroundColor: colors.white[4],
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
          stickyHeaderIndices={[1]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            {searchParam === "" && (
              <Row justifyContent={"space-between"}>
                <TouchableOpacity style={styles.icon}>
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
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => {
                    setShowSearch(!showSearch);
                  }}
                >
                  <Ionicons
                    name={showSearch ? "close-outline" : "search-outline"}
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </Row>
            )}

            {/* <Image source={require("../assets/banner.png")} style={styles.banner} /> */}
          </View>
          <View style={styles.search}>
            {showSearch ? (
              <SafeAreaView>
                <TextField2
                  value={searchParam}
                  onChangeText={(e) => {
                    setSearchParam(e);
                  }}
                  style={{ marginTop: 14 }}
                  end={
                    <TouchableOpacity
                      onPress={() => {
                        if (searchParam != "") {
                          setSearchParam("");
                        }
                      }}
                    >
                   
                      <Ionicons
                        name={
                          searchParam != "" ? "close-outline" : "search-outline"
                        }
                        size={24}
                        color="black"
                      />
                    </TouchableOpacity>
                  }
                  background
                  placeholder="Search Dark Store"
                />

              </SafeAreaView>
            ) : (
              <ScrollView
                style={{ marginTop: 10 }}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
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
                        style={{ width: 32, height: 32, resizeMode: "contain" }}
                      />
                    </View>
                    <Typography align="center" variant="body2" fontWeight={500}>
                      {cur.name}
                    </Typography>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
            {
              searchResult?.brands?.length>0&&
              < TouchableOpacity  onPress={()=>{navigation.navigate(VIEWPRODUCTSBYBRANDS,{id:searchResult?.brands[0]?._id})}}>
                <Divider/>
                <Row  gap={10}>
<Image source={{uri:searchResult?.brands[0]?.image}}  style={{height:25,width:25,resizeMode:"contain"}}/>
<Typography>{searchResult?.brands[0]?.name}</Typography>
                </Row>
                <Divider/>
                </TouchableOpacity>
            }
            {
              searchResult?.products?.length>0&&searchResult?.products?.map((cur,i)=>(
                <TouchableOpacity    onPress={() => {
                  navigation.navigate(PRODUCT_DETAILS, {
                    productId: cur._id,
                  });
                }} style={{marginTop:8,marginBottom:8}}>
                  <Typography>{cur.name}</Typography>
                </TouchableOpacity>
              ))
            }
          
          </View>
          <View style={styles.content}>
            {Object.keys(products).map((cur, i) => (
              <View style={{ marginBottom: 25 }} key={i}>
           
                <Row mb={20} justifyContent={"space-between"}>
                  <Typography variant="h5" fontWeight={700}>
                    {
                      categoryState?.data?.find((item) => item._id === cur)
                        ?.name
                    }
                  </Typography>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(VIEWBYCATEGORY, { id: cur });
                    }}
                  >
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
                  {products[cur].map((cur, i) => (
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
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default Shop;
