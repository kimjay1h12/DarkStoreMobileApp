import React from "react";
import { Alert, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView, Typography, useColors } from "../../src/Hoddy-ui";

import Header from "../../components/custom/Header";

import { MaterialIcons } from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";
import Divider from "../../components/custom/Divider";
import OrderItem from "../../components/orders/OrderItem";
import { SINGLEORDER } from "../../src/navigation/routes";
import { GLobalContext } from "../../src/context";
import { formatDate } from "../../utility";
function Order({ navigation }) {
  const colors = useColors();
  const {
    ordersState: { data = [] },
  } = React.useContext(GLobalContext);
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
              Help With Order
            </Typography>
          }
        />
        <Divider />

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.orderitems}
        >
          {data.length > 0 ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              {data?.reverse()?.map((cur, i) => (
                <OrderItem
                  status={cur.orderStatus}
                  orderNumber={cur.orderId}
                  data={cur.item}
                  qauntity={cur.quantity}
                  key={i}
                  price={cur.total}
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
        </ScrollView>
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
export default Order;
