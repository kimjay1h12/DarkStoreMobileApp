import React from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
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
import { CHECKOUT } from "../../src/navigation/routes";
import { currencyFormatter } from "../../utility";
import OrderItem from "../../components/orders/OrderItem";

function Orders({ navigation }) {
  const {
    authState,
    ordersState:{data,loading},

  } = React.useContext(GLobalContext);
  const colors = useColors();
  console.log("orders state: ", data.orders)
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
      position: "absolute",
      bottom: "70@s",
      left: 0,
      right: 0,
      padding: 15,
    },
    content: {

      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      backgroundColor:colors.white[2],
      marginTop: 10,
      paddingTop: 30,
      padding: "15@s",
      minHeight: "100%",
    },
    icon: {
      padding: 15,
      backgroundColor:colors.white[4],
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
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <Header
 
        center={
          <Typography style={{ marginTop: 10 }} variant="h4" fontWeight={600}>
           My Orders
          </Typography>
        }
        content={
          <View style={styles.address}>
            <Row gap={10}>
              <Ionicons name="location-outline" size={25} color={"#aaa"} />
              <Typography fontWeight={600}>
                {authState?.data?.location?.description}
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
      <ScrollView showsVerticalScrollIndicator={false}>
          {data?.orders?.length > 0 ? (
            data?.orders?.map((cur, i) => <OrderItem {...cur}  navigation={navigation} index={i} key={i}/>)
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
                Oops Empty Orders
              </Typography>
            </View>
          )}

          
       
      </ScrollView>
        </View>
    </View>
  );
}

export default Orders;
