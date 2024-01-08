import React from "react";
import { Dimensions, Image, ScrollView, TouchableOpacity, View } from "react-native";
import {
  Button,
  SafeAreaView,
  Spinner,
  TextField,
  TextField2,
  Typography,
  useColors,
} from "../../src/Hoddy-ui";
import Header from "../../components/custom/Header";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import Divider from "../../components/custom/Divider";
import ItemCard from "../../components/basket/ItemCard";
import { ScaledSheet } from "react-native-size-matters";
import Row from "../../components/custom/Row";
import { GLobalContext } from "../../src/context";
import { CHECKOUT, LOGIN_SCREEN } from "../../src/navigation/routes";
import { currencyFormatter } from "../../utility";

function Basket({ navigation }) {
  const {
    authState,
    cartState: {
      data: { cartData, total },
      loading,
    },
  } = React.useContext(GLobalContext);
  const colors = useColors();

  const styles = ScaledSheet.create({
    root: {},
    container: {
      padding: "15@s",
    },
    price: {
      marginTop: 30,
    },
    voucher: {
      marginTop: 20,
    },
    end: {
      // position: "absolute",
      // bottom:0,
      // left: 0,
      // right: 0,
      // padding: 15,
      marginTop:50
    
    },
    content: {
      flex: 1,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      backgroundColor: colors.white[2],
      marginTop: 10,
      paddingTop: 30,
      padding: "15@s",
    

  minHeight:"100%"
      // height: "300%",
    },
    icon: {
      padding: 15,
      backgroundColor: "#e7e7e7",
      borderRadius: 100,
      width: 60,
      height: 60,
      justifyContent: "center",
      alignItems: "center",
    },
    address: {
      marginTop: 20,
      backgroundColor: colors.white[4],
      borderRadius: 10,
      padding: 12,
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      justifyContent: "space-between",
    },
  });
  return (
    <View style={{ flex: 1, backgroundColor: "#000",minHeight:Dimensions.get("screen").height }}>
      <Header
        center={
          <Typography style={{ marginTop: 10 }} variant="h4" fontWeight={600}>
            {" "}
            Cart
          </Typography>
        }
        content={
          <View style={styles.address}>
            <Row gap={10}>
              <Ionicons name="location-outline" size={25} color={"#000"} />
              <Typography fontWeight={600}>
                {
                  authState?.loggedIn?
                  authState?.data?.location?.description:"Login to your location"
                }
           
              </Typography>
            </Row>
            <MaterialIcons
              // style={{marginLeft:5}}
              name="arrow-forward-ios"
              size={24}
              color={"#aaa"}
            />
          </View>
        }
      />

      {loading && <Spinner fullscreen />}
        <View style={styles.content}>
      <ScrollView  showsVerticalScrollIndicator={false}>
          {cartData?.length > 0 ? (
            cartData?.map((cur, i) => <ItemCard key={i} {...cur} />)
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../../assets/img/empty.png")}
                style={{ height: 300, width: 300, resizeMode: "contain" }}
              />
              <Typography gutterBottom={100} fontWeight={700} variant="h4">
                Oops Empty Cart
              </Typography>
            </View>
          )}

<View style={styles.end}>
            <Button
            onPress={()=>{  navigation.navigate( authState?.loggedIn? CHECKOUT:LOGIN_SCREEN)}}
              disabled={cartData?.length === 0}
              title={`Checkout   ${currencyFormatter(total)}`}
              fullWidth
            />
          </View>    
      </ScrollView>

        </View>
    </View>
  );
}

export default Basket;
