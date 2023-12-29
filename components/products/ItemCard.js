import React, { useContext, useState } from "react";
import { Typography, useColors } from "../../src/Hoddy-ui";
import { ScaledSheet } from "react-native-size-matters";
import { Image, TouchableOpacity, View } from "react-native";
import Row from "../custom/Row";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Haptics } from "expo-haptics";
import { addToCart, getCart } from "../../src/context/actions/cart";
import { GLobalContext } from "../../src/context";
import { AddProductToFavourite } from "../../src/context/actions/products";
import { ProductSort } from "../../utility";
function ItemCard({
  image,
  name,
  onPress = () => {},
  price,
  _id,
  spread,
  size = "small",
}) {
  const styles = ScaledSheet.create({
    root: {
      width:"150@s",
  
      marginRight:spread?0: "20@s",
    },
    image: {
      height: "80%",
      width: "100%",
      resizeMode: "contain",
      // borderRadius: 6,
    },
    imagecontainer: {
      backgroundColor: "#eee",
      minHeight: "130@vs",
      borderRadius: 20,
      padding: "2@s",
      flex: 0,
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });
  const colors = useColors();
  const [products, setProducts] = useState([])
  const [favorite, setFavorite] = React.useState(false);
  const [addtocart1, setAddtocart1] = React.useState(false);
  const { cartState, cartDispatch, favouriteState, favouriteDispatch } =
    useContext(GLobalContext);
  const [formData, setFormData] = React.useState({
    productId: "",
    quantity: 1,
  });
  const [favouriteData, setFavouriteData] = React.useState({
    productId: "",
  });
  React.useEffect(() => {
    setFormData({ ...formData, productId: _id });
    setFavouriteData({ ...favouriteData, productId: _id });
  }, [_id]);
  const AddToFavourite = async () => {
    const res = await AddProductToFavourite(favouriteData, favouriteDispatch);
    if (res) {
      setFavorite(true);
    }
  };
  const AddToCart = async () => {
    const success = await addToCart(formData, cartDispatch);

    if (success) getCart(cartDispatch);

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };
  React.useEffect(() => {
    if (cartState.data?.items?.find((cur) => cur.itemId._id === _id)) {
      setAddtocart1(true);
    } else {
      setAddtocart1(false);
    }
  }, [cartState]);
  React.useEffect(() => {
    if (favouriteState.data?.items?.find((cur) => cur.items?._id === _id)) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }, [favouriteState]);


  return (
    <TouchableOpacity onPress={onPress} style={styles.root}>
      <View style={styles.imagecontainer}>
        <Row justifyContent={"center"}>
          {/* <TouchableOpacity
            style={{ position: "absolute", top: 3, left: 0, zIndex: 1 }}
            onPress={() => {
              AddToFavourite();
            }}
          >
            {favorite ? (
              <MaterialIcons name="favorite" size={27} color={"#461257"} />
            ) : (
              <MaterialIcons
                name="favorite-border"
                size={27}
                color={"#461257"}
              />
            )}
          </TouchableOpacity> */}

          <Image source={{ uri: image[0] }} style={styles.image} />
          {/* <View
            style={{ position: "absolute", bottom: 0, right: 0, zIndex: 1 }}
          >
            <TouchableOpacity
              onPress={() => {
                setAddtocart1(!addtocart1);
                AddToCart();
              }}
            >
              {addtocart1 ? (
                <Ionicons name="checkmark-circle" size={32} color={"#461257"} />
              ) : (
                <Entypo name="circle-with-plus" size={32} color={"#461257"} />
              )}
            </TouchableOpacity>
          </View> */}
        </Row>
      </View>
      <View style={{ marginTop: 9 }}>
        <Typography   gutterBottom={5}fontWeight={600} >
          {name?.slice(0,20)}
        </Typography>
        <Row>
          <Typography  variant="body2">₦ {price} </Typography>
          <Typography
         
            variant="caption"
            color="grey"
            style={{ textDecorationLine: "line-through" }}
          >
            {" "}
            ₦ {price + 300}
          </Typography>
          <Typography style={{ marginLeft: 5 }} variant="caption" color="error">
            -30%
          </Typography>
        </Row>
      </View>
    </TouchableOpacity>
  );
}

export default ItemCard;
