import React from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import {
  Avatar,
  Button,
  SafeAreaView,
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
import OrderItem from "../../components/orders/OrderItem";
import { GLobalContext } from "../../src/context";
import { TABS_NAVIGATOR, TRACKORDER } from "../../src/navigation/routes";
import { formatDate, formatDateToYYYYMMDD } from "../../utility";
import { watchActiveTrip } from "../../src/context/actions/riders";
function Myorders({ navigation }) {
  const {
    ordersState: { data = [] },
    riderDispatch,
    riderState,
  } = React.useContext(GLobalContext);

  const colors = useColors();
  const [steps, setSteps] = React.useState(1);
  console.log(data);
  return (
    <View style={{ flex: 1 }}>
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
              My Orders
            </Typography>
          }
        />
        <Divider />
        {data.length > 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.orderitems}
          >
            {data?.reverse()?.map((cur, i) => (
              <OrderItem
                status={cur.orderStatus}
                orderNumber={cur.orderId}
                data={cur.item}
                rider={cur.riderAssigned}
                qauntity={cur.quantity}
                key={i}
                price={cur.total}
                onPress={() => {
                  watchActiveTrip(riderDispatch, cur._id);
                  navigation.navigate(TRACKORDER, { order: cur });
                }}
                date={formatDate(cur.item?.dateCreated)}
              />
            ))}
          </ScrollView>
        ) : (
          <View style={styles.empty}>
            <Image
              source={require("../../assets/img/orderempty.png")}
              style={styles.emptyimage}
            />
            <Typography
              gutterBottom={10}
              variant="h5"
              align="center"
              fontWeight={700}
            >
              You haven’t made any orders
            </Typography>
            <Typography align="center" gutterBottom={30}>
              Check out our catalog for items you’re bound to love
            </Typography>
            <Button
              title="Start Shopping"
              onPress={() => {
                navigation.navigate(TABS_NAVIGATOR);
              }}
              fullWidth
            />
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}
const styles = ScaledSheet.create({
  root: {
    padding: "15@s",
  },
  orderitems: {
    padding: "18@s",
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "15@s",
  },
  emptyimage: {
    height: "200@s",
    width: "200@s",
    resizeMode: "contain",
  },
});
export default Myorders;
