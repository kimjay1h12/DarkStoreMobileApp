import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import React, { useContext, useRef, useState } from "react";
import {
  Animated,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import client from "../../api/client";
import Divider from "../../components/custom/Divider";
import Header from "../../components/custom/Header";
import Row from "../../components/custom/Row";
import ItemCard from "../../components/products/ItemCard";
import {
  Button,
  SafeAreaView,
  Spinner,
  Typography,
  useColors,
} from "../../src/Hoddy-ui";
import { GLobalContext } from "../../src/context";
import { addToCart } from "../../src/context/actions/cart";
import { PRODUCT_DETAILS } from "../../src/navigation/routes";
import SlidingImageBackground from "../../components/custom/SlidingBackground";
import { ButtonGroup } from "react-native-elements";
import { currencyFormatter } from "../../utility";
function Details({ navigation, route }) {
  const { productId } = route.params;
  const [selectedSize, setSelectedSize] = useState("");
  const { cartState, cartDispatch } = useContext(GLobalContext);
const [readMore, setReadMore] = useState(250)
  const [activeSlide, setActiveSlide] = React.useState(0);
  const colors = useColors();
  const [formData, setformData] = React.useState({
    productId: "",
    quantity: 1,
  });
  const [productDetails, setProductDetails] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const FetchProductDetails = async () => {
    setLoading(true);
    try {
      const res = (await client.get(`/products/${productId}`)).data;
      setProductDetails(res.data);
      setColor(res.data?.color[0]);
      setSelectedSize(res.data?.size[0])
      setformData({ ...formData, productId: res.data._id });
    } catch (error) {
      console.log("error fetching product details", error.response);
    }
    setLoading(false);
  };
  React.useEffect(() => {
    FetchProductDetails();
  }, [productId]);
  const [relatedProducts, setRelatedProducts] = React.useState([]);
 
  const [addedToCart, setAddedToCart] = React.useState(false);
  const HandleAddToCart = async () => {
    setLoading(true);
    const res = await addToCart(
      {
       ...productDetails,
        qunatityRequested: 1,
        selectedColor:color,
        selectedSize:selectedSize,
      },
     cartDispatch,
    );
    setLoading(false);
  };
  const [color, setColor] = useState("");

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      {loading ? (
        <Spinner fullscreen />
      ) : (
        <View style={styles.root}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{}}>
              <SlidingImageBackground images={productDetails?.image}>
                <View style={styles.header}>
                  <View>
                    <Row justifyContent={"space-between"}>
                      <TouchableOpacity
                        style={styles.icon}
                        onPress={() => {
                          navigation.goBack();
                        }}
                      >
                        <AntDesign name="arrowleft" size={24} color="#000" />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <MaterialIcons
                          name="favorite-border"
                          size={24}
                          color="transparent"
                        />
                      </TouchableOpacity>
                    </Row>
                  </View>
                </View>
              </SlidingImageBackground>
            </View>

            <View style={styles.content}>
              {/* <Row mt={20} mb={20} justifyContent="space-between">
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity
                      disabled={formData.quantity === 1}
                      onPress={() => {
                        setformData({
                          ...formData,
                          quantity: formData.quantity - 1,
                        });
                      }}
                      style={[
                        styles.quantityBtn,
                        {
                          backgroundColor:
                            formData.quantity > 1
                              ? colors.primary.main
                              : colors.white[3],
                        },
                      ]}
                    >
                      <Ionicons
                        name="remove"
                        size={24}
                        color={true ? "#fff" : colors.dark.main}
                      />
                    </TouchableOpacity>
                    <Typography
                      style={{ paddingHorizontal: 10 }}
                      fontWeight={700}
                      variant="h6"
                    >
                      {formData.quantity}
                    </Typography>
                    <TouchableOpacity
                      onPress={() => {
                        setformData({
                          ...formData,
                          quantity: formData.quantity + 1,
                        });
                      }}
                      style={[
                        styles.quantityBtn,
                        {
                          backgroundColor: colors.primary.main,
                        },
                      ]}
                    >
                      <Ionicons name="add" size={24} color="#fff" />
                    </TouchableOpacity>
                  </View>
                  <Button
                    onPress={() => {
                      AddToCart();
                    }}
                    title={
                      addedToCart ? (
                        <MaterialIcons name="done" size={24} color="#fff" />
                      ) : (
                        "Add to basket"
                      )
                    }
                  />
                </Row> */}

              <View style={{ marginTop: 5 }}>
                <Typography variant="h4" gutterBottom={10} fontWeight={600}>
                  {productDetails?.name}
                </Typography>
                <View style={styles.price}>
                  
                  <Typography variant="h6" fontWeight={600}>
                {currencyFormatter( productDetails?.price)}
                  </Typography>
                  <Typography
         
      fontWeight={500}
         color="error"
         style={{ textDecorationLine: "line-through" }}
       >
         {" "}
         {currencyFormatter( productDetails?.price + 200)}
       </Typography>
    
              
                </View>
                <View>
                  {productDetails?.color?.length > 0 && (
                    <Text
                      style={{
                        marginBottom: 16,
                        marginTop: 16,
                        fontWeight: 600,
                      }}
                    >
                      Available Colors
                    </Text>
                  )}

                  <ButtonGroup
                    buttons={productDetails?.color || []}
                    onPress={(selectedIndex) => {
                      const cur = productDetails?.color[selectedIndex];
                      setColor(cur === color ? "" : cur);
                    }}
                    selectedButtonStyle={{
                      opacity: 0.7,
                      backgroundColor: color.toLocaleLowerCase(),
                    }}
                    selectedIndex={productDetails?.color?.findIndex(
                      (cur) => cur === color
                    )}
                  />

                  {productDetails?.size?.length > 0 && (
                    <Text    style={{
                      marginBottom: 16,
                      marginTop: 16,
                      fontWeight: 600,
                    }}>
                      Available Sizes
                    </Text>
                  )}

                  <View
                    style={{
                      flexDirection: "row",
                  
                      marginTop: 8,
                      marginBottom:20
                    }}
                  >
                    {productDetails?.size?.map((cur, i) => (
                      <TouchableOpacity
                        key={i}
                        onPress={() => {
                          setSelectedSize(cur);
                        }}
                        style={{
                          height: 40,
                          width: 70,
                          alignItems: "center",
                          justifyContent: "center",
                          borderColor: "#aaa",
                          borderWidth: 1,
                          backgroundColor:
                            selectedSize === cur ? "#000" : "#fff",
                          color: selectedSize === cur ? "#fff" : "#000",
                        }}
                      >
                        <Text  style={{      color: selectedSize === cur ? "#fff" : "#000",}}>{cur}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                <Typography  color="grey">{productDetails?.description?.slice(0,readMore)}

                </Typography>
                <TouchableOpacity  style={{marginBottom:20,marginTop:10}} onPress={()=>{setReadMore( readMore>250?250: 20000000000000)}}><Typography color={readMore>250?"error":"dark"} fontWeight={600} > {readMore>250?"Read Less"
                :"Read more"}</Typography></TouchableOpacity>
                <Button  gutterBottom={10} loading={loading} onPress={()=>{
                  HandleAddToCart()
                }} title="Add To Cart" fullWidth/>
            
              </View>
          
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}
const styles = ScaledSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000",
  },
  image: {
    height: "300@s",
    resizeMode: "contain",
    width: "100%",
    marginBottom: 20,
  },
  icon: {
    padding: 10,
    backgroundColor: "#e7e7e7",
    borderRadius: 100,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginTop: "35@vs",
    paddingHorizontal: "15@s",

    zIndex: 100,
    position: "absolute",
  },
  price:{
backgroundColor:"#eee",
borderRadius:10,
padding:15,
flexDirection:"row",
gap:10,
alignItems: "center",
  },
  content: {
    flex: 1,
    minHeight:"100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#fff",
    marginTop: 10,
    paddingTop: 30,
    padding: "15@s",
  },
});
export default Details;
