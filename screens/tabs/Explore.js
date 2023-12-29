import { useContext, useEffect, useState } from "react";
import { Alert, Image, ScrollView, TouchableOpacity, View } from "react-native";
import {
  Avatar,
  Button,
  ListItem,
  SafeAreaView,
  Spinner,
  TextField2,
  Typography,
  useColors,
} from "../../src/Hoddy-ui";

import Header from "../../components/custom/Header";

import Divider from "../../components/custom/Divider";
import { ScaledSheet } from "react-native-size-matters";
import Row from "../../components/custom/Row";
import {
  Entypo,
  Feather,
  Foundation,
  SimpleLineIcons,
  MaterialIcons,
  Ionicons,
  FontAwesome5,
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  ADDRESSBOOK,
  CHANGEPASSWORD,
  GETHELP,
  MYDETAILS,
  MYORDERS,
  PAYMENTDETAILS,
  PROMOTION,
  REFERRAL,
  VIEWBYCATEGORY,
} from "../../src/navigation/routes";
import { signoutHandler } from "../../src/context/actions/authAction";
import { GLobalContext } from "../../src/context";
import client from "../../api/client";
function Explore({ navigation }) {
  const colors = useColors();
  const {
    categoryState: { data },
  } = useContext(GLobalContext);
  const [productsSearch, setProductsSearch] = useState([]);
  const [searchParams, setSearchParams] = useState("");
  const SearchForProducts = async () => {
    try {
      const res = (
        await client.get(`/customer/product/search?name=${searchParams}`)
      ).data;
      setProductsSearch(res.data);
    } catch (error) {
      console.log("Error searching for products", error.response);
    }
  };
  useEffect(() => {
    if (searchParams != "") {
      SearchForProducts();
    } else {
      setProductsSearch([]);
    }
  }, [searchParams]);
  const styles = ScaledSheet.create({
    root: {
      padding: "15@s",
    },
    category: {
      width: "48%",
      height: "140@s",

      borderTopLeftRadius: "20@s",
      borderTopRightRadius: "20@s",
      borderBottomEndRadius: "8@s",
      borderBottomStartRadius: "8@s",
      marginBottom: "10@s",
      borderColor: "rgba(115, 127, 241, 0.5)",
      borderBottomWidth: 1,
      borderEndWidth: 1,
      borderStartWidth: 1,
      flex: 0,
      alignItems: "center",
    },
    image: {
      borderTopLeftRadius: "20@s",
      borderTopRightRadius: "20@s",
      height: "70%",
      width: "101%",
      resizeMode: "cover",
    },
    list: {
      backgroundColor: "#f7f7f7",
      elevation: 2,
      shadowColor: "#aaa",
      shadowOpacity: 0.06,
      shadowRadius: 0,

      shadowOffset: {
        height: 2,
        width: 2,
      },
      borderRadius: 10,
      marginBottom: 10,
    },
  });
  return (
    <View style={{ flex: 1 }}>
      {/* {loading && <Spinner fullscreen />} */}
      <SafeAreaView style={{ flex: 1 }}>
        <Header
          left={
            <TouchableOpacity
              style={{ width: "33.3%" }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <MaterialIcons
                name="arrow-back-ios"
                size={24}
                color={colors.primary.main}
              />
            </TouchableOpacity>
          }
          center={
            <Typography variant="h6" fontWeight={600} align="center">
              Explore
            </Typography>
          }
        />
        <Divider />
        <View style={styles.root}>
          <View>
            <TextField2
              value={searchParams}
              onChangeText={(e) => {
                setSearchParams(e);
              }}
              placeholder="What are you looking for?"
              start={<Ionicons name="md-search-sharp" size={24} color="#aaa" />}
            />
          </View>
          {searchParams === "" ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ marginTop: 10 }}>
                <Typography variant="h6" color="primary">
                  Top categories
                </Typography>
                <View
                  style={{
                    marginTop: 20,
                    marginBottom: 20,
                    flexWrap: "wrap",
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {data?.map((cur, i) => (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate(VIEWBYCATEGORY, {
                          data: {
                            title: cur.name,
                            items: cur.value,
                          },
                        });
                      }}
                      key={i}
                      style={styles.category}
                    >
                      <Image
                        source={require("../../assets/img/category.png")}
                        style={styles.image}
                      />
                      <View
                        style={{
                          flex: 0,
                          height: "30%",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography>{cur.name}</Typography>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 10 }}
            >
              {productsSearch.length > 0 &&
                productsSearch.map((cur, i) => (
                  <View key={i} style={styles.list}>
                    <ListItem
                      divider={i < productsSearch?.length - 1}
                      link
                      onPress={() => {
                        navigation.navigate(VIEWBYCATEGORY, {
                          data: {
                            title: cur.name,
                            items: productsSearch,
                          },
                        });
                      }}
                    >
                      <MaterialIcons
                        name="shopping-cart"
                        style={{ marginRight: 10 }}
                        size={16}
                        color={"#000"}
                      />
                      <Typography style={{ flex: 1 }}>{cur.name}</Typography>
                    </ListItem>
                  </View>
                  // <TouchableOpacity
                  //   key={i}
                  //   onPress={() => {
                  //     navigation.navigate(VIEWBYCATEGORY, {
                  //       data: {
                  //         title: cur.name,
                  //         items: productsSearch,
                  //       },
                  //     });
                  //   }}
                  // >
                  //   <Typography fontWeight={500} gutterBottom={20}>
                  //     {cur.name}
                  //   </Typography>
                  // </TouchableOpacity>
                ))}
              {productsSearch.length === 0 && searchParams != "" && (
                <View style={styles.list}>
                  <ListItem link>
                    <MaterialIcons
                      name="shopping-cart"
                      style={{ marginRight: 10 }}
                      size={16}
                      color={"#000"}
                    />
                    <Typography style={{ flex: 1 }}>
                      Not Found Or Not Avaliable At The Momemt
                    </Typography>
                  </ListItem>
                </View>
              )}
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
      <Divider />
    </View>
  );
}

export default Explore;
