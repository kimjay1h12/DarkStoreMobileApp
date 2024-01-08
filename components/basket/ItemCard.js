import React, { useContext, useEffect } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Spinner, Typography, colors, useColors } from "../../src/Hoddy-ui";
import { ScaledSheet } from "react-native-size-matters";
import Row from "../custom/Row";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Alert } from "react-native";
import { deleteFromCart, getCart, updateCartQuantity } from "../../src/context/actions/cart";
import { GLobalContext } from "../../src/context";
import client from "../../api/client";
import { currencyFormatter } from "../../utility";
function ItemCard({ name, price, qunatityRequested, image, _id }) {
  const colors = useColors();

  const {
    cartDispatch,
    cartState: { loading },
  } = useContext(GLobalContext);
  const [quantity1, setQuantity1] = React.useState(qunatityRequested);
  const [deleteData, setDeleteData] = React.useState({
    productId: "",
  });

  useEffect(() => {
    setDeleteData({ ...deleteData, productId: _id });
  }, [_id]);
  const DeleteItem = async () => {
    const res = deleteFromCart(deleteData, cartDispatch);
  };
  const updateProduct = async (number) => {
const res = await updateCartQuantity(_id,number,cartDispatch)
  };
  const styles = ScaledSheet.create({
    root: {
      padding: "15@s",
      borderRadius: 15,
      marginBottom: 10,
    },
    right: {
      flex: 0,
      flexDirection: "column",
      justifyContent: "space-between",
      alignContent: "space-between",
      width: "80%",
      height: "75@s",
    },
    image: {
      height: "100%",
      width: "20%",
      resizeMode: "contain",
      borderRadius: 5,
  
    },
    quantityBtn: {
      height: "25@ms",
      width: "25@ms",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 20,
    },
  });
  return (
    <TouchableOpacity
      style={[styles.root, { backgroundColor:colors.white[4] }]}
    >
      <Row gap={7}>
       
        <Image source={{ uri: image[0] }} style={styles.image} />
        <View style={styles.right}>
          <Row justifyContent="space-between" align="flex-start">
            <View  style={{width:"80%"}}>
              <Typography gutterBottom={5} fontWeight={700}>
                {name}
              </Typography>
        
            </View>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Delete Item",
                  "Are you sure you want to remove this item",
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    { text: "OK", onPress: () => DeleteItem() },
                  ]
                );
              }}
            >
              <MaterialIcons name="delete-outline" size={24} color="red" />
            </TouchableOpacity>
          </Row>
          <Row justifyContent="space-between">
            <View>
              <Typography>{currencyFormatter( price)}</Typography>
            </View>
            <TouchableOpacity>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  disabled={qunatityRequested === 1}
                  onPress={() => {
                    setQuantity1(quantity1 - 1);
                    updateProduct(quantity1-1);
                  }}
                  style={[
                    styles.quantityBtn,
                    {
                      backgroundColor: true
                        ?"#000"
                        : colors.white[3],
                    },
                  ]}
                >
                  <Ionicons
                    name="remove"
                    size={18}
                    color={true ? "#fff" : colors.dark.main}
                  />
                </TouchableOpacity>
                <Typography
                  style={{ paddingHorizontal: 10 }}
                  fontWeight={700}
                  variant="h6"
                >
                  {qunatityRequested?.toString()}
                </Typography>
                <TouchableOpacity
                  onPress={() => {
                    setQuantity1(quantity1 + 1);
                    updateProduct(quantity1 +1);
                  }}
                  style={[
                    styles.quantityBtn,
                    {
                      backgroundColor:"#000",
                    },
                  ]}
                >
                  <Ionicons name="add" size={17} color="#fff" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Row>
        </View>
      </Row>
    </TouchableOpacity>
  );
}


export default ItemCard;
