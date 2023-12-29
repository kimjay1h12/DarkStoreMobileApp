import { useContext, useEffect, useState } from "react";
import { Alert, Image, ScrollView, TouchableOpacity, View } from "react-native";
import {
  Avatar,
  Button,
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
import { GLobalContext } from "../../src/context";
import client from "../../api/client";
import { addToCart } from "../../src/context/actions/cart";
import { getFavourite } from "../../src/context/actions/orders";

function Favourite() {
  const [formData, setFormData] = useState({
    productId: "",
    quantity: 1,
  });
  const colors = useColors();
  const {
    favouriteDispatch,
    favouriteState: { data },
    cartDispatch,
  } = useContext(GLobalContext);
  const [loading, setLoading] = useState(false);
  const AddToCart = async (id) => {
    setLoading(true);
    const res = await addToCart(
      {
        productId: id,
        quantity: 1,
      },
      cartDispatch
    );
    setLoading(false);
  };
  const DeleteItem = async (id) => {
    setLoading(true);
    try {
      const res = await client.put("/customer/favourites", {
        productId: id,
      });
      getFavourite(favouriteDispatch);
    } catch (error) {
      console.log("error removing product", error.response);
    }
    setLoading(false);
  };
  return (
    <View style={{ flex: 1 }}>
      {loading && <Spinner fullscreen />}
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
              Favourite
            </Typography>
          }
        />
        <Divider />
        <View style={styles.root}>
          {data?.items?.map((cur, i) => (
            <View style={styles.item} key={i}>
              <Row justifyContent={"space-between"}>
                <Row align="flex-start" gap={10}>
                  <Image
                    source={{ uri: cur.itemId?.image }}
                    style={styles.image}
                  />
                  <View>
                    <Typography gutterBottom={3} variant="h6" fontWeight={600}>
                      {cur.itemId?.name}
                    </Typography>
                    <Typography>₦ {cur.itemId?.price}</Typography>
                  </View>
                </Row>
                <View
                  style={{
                    flex: 0,
                    height: 90,
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        "Romove Favourite Item",
                        `Are you sure you want to remove ${cur.itemId?.name} from Favorite`,
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel",
                          },
                          {
                            text: "OK",
                            onPress: () => {
                              DeleteItem(cur.itemId?._id);
                            },
                          },
                        ]
                      );
                    }}
                  >
                    <MaterialIcons
                      name="delete-forever"
                      size={24}
                      color="red"
                    />
                  </TouchableOpacity>
                  <Button
                    title="Add to Basket"
                    size="small"
                    onPress={() => {
                      AddToCart(cur.itemId?._id);
                    }}
                  />
                </View>
              </Row>
              <Divider />
            </View>
          ))}
        </View>
      </SafeAreaView>
    </View>
  );
}
const styles = ScaledSheet.create({
  root: {
    paddingHorizontal: "15@s",
    marginTop: 15,
  },
  item: {
    height: "90@s",
    marginTop: 10,
  },
  image: {
    height: "80@s",
    width: "80@s",
    resizeMode: "contain",
  },
});
export default Favourite;
