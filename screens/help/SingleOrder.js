import React from "react";
import { Alert, Image, ScrollView, TouchableOpacity, View } from "react-native";
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
function SingleOrder({ navigation }) {
  const colors = useColors();

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
          <OrderItem header={false} onPress={() => Alert.alert("helli")} />
          <View>
            <TouchableOpacity
              style={[styles.button, { borderColor: colors.dark.main }]}
            >
              <Row gap={20}>
                <Entypo name="block" size={30} color={colors.dark.main} />
                <Typography>Wrong Order</Typography>
              </Row>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { borderColor: colors.dark.main }]}
            >
              <Row gap={20}>
                <Entypo name="block" size={30} color={colors.dark.main} />
                <Typography>Spolit Goods</Typography>
              </Row>
            </TouchableOpacity>
          </View>
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
  button: {
    borderRadius: 10,
    borderWidth: "1@s",
    paddingHorizontal: 15,
    paddingVertical: 18,
    marginBottom: 10,
    marginTop: 10,
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
export default SingleOrder;
