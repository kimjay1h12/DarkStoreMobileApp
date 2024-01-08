import React, { useContext, useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import {
  Button,
  SafeAreaView,
  Spinner,
  Typography,
  useColors,
} from "../../src/Hoddy-ui";
import Header from "../../components/custom/Header";
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
import Divider from "../../components/custom/Divider";
import { ProductSortByBrands, groupArrayByProperty } from "../../utility";
import ItemCard from "../../components/products/ItemCard";
import Row from "../../components/custom/Row";
import { PRODUCT_DETAILS, VIEWPRODUCTS, VIEWPRODUCTSBYBRANDS } from "../../src/navigation/routes";
import { GLobalContext } from "../../src/context";
import { ScaledSheet } from "react-native-size-matters";
import client from "../../api/client";
function ViewCategory({ navigation, route }) {
  const { id} = route.params;
  const colors = useColors();
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = React.useState([]);
const {brandState,categoryState}= useContext(GLobalContext)
const FetchProductByCategory = async()=>{
  setLoading(true)
  try {
    const product =(await client.get(`/products/category/${id}`)).data
    console.log( ProductSortByBrands(product.data),"fghj")
    setProducts(ProductSortByBrands(product.data))
  } catch (error) {
    console.log(error.response)
  }
  setLoading(false)
}
useEffect(() => {
FetchProductByCategory()
}, [id])
const styles =ScaledSheet.create({
  

  content: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.white[2],
    marginTop: 10,
    paddingTop:30,
    padding: "15@s",
    minHeight:"100%"
  },
  icon: {
    padding: 15,
    backgroundColor:colors.white[4],
    borderRadius: 100,
    paddingLeft:20,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  })
  return (
    <View style={{ flex: 1 ,backgroundColor:"#000"}}>
     
        <Header
          left={
            <TouchableOpacity
         style={styles.icon}
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
            <Typography variant="h5" fontWeight={600} align="center">
            {categoryState?.data.find((item)=>item._id ===id)?.name}
            </Typography>
          }
        />
 
          {loading ?<Spinner  fullscreen/>:
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
          {
        Object.keys(products)
       .map((cur,i)=>(
        
          <View style={{marginBottom:25}} key={i}>
            {console.log(cur,"cur")}
          <Row mb={20} justifyContent={"space-between"}>
            <Typography variant="h5" fontWeight={700}>
            
          {brandState?.data?.find((item)=>item._id === cur)?.name}
            </Typography>
            <TouchableOpacity  onPress={()=>{navigation.navigate(VIEWPRODUCTSBYBRANDS,{id:cur})}} >
              <Row>
              <Typography fontWeight={500} variant="body2"  >See all</Typography>
          
          <Ionicons name="arrow-forward-outline" size={22} color="black" />
      </Row>
            </TouchableOpacity>
          </Row> 
           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {
              products[cur].map((cur,i)=>(
              <ItemCard {...cur} onPress={()=>{ navigation.navigate(PRODUCT_DETAILS, {
                productId: cur._id,
              });}}  key={i}/>
              ))
            }
          </ScrollView></View>
        ))
      }
          </View>
        </ScrollView>}

    </View>
  );
}

export default ViewCategory;
