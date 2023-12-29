import React, { useContext, useState } from "react";
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
import { ADDADDRESS, ADDPAYMENTDETAILS } from "../../src/navigation/routes";
import { Paystack, paystackProps } from "react-native-paystack-webview";
import { PAYSTACK_KEY } from "../../api/config";
import { currencyFormatter, errorMessage } from "../../utility";
import FlashMessage, {
  showFlashMessage,
} from "../../src/Hoddy-ui/Components/FlashMessage";
import client from "../../api/client";
import { GLobalContext } from "../../src/context";
import { getCurrentUser } from "../../src/context/actions/authAction";
function Paymentdetails({ navigation }) {
  const {
    authDispatch,
    authState: { data },
  } = useContext(GLobalContext);

  const colors = useColors();
  const [steps, setSteps] = React.useState(1);
  const paystackWebViewRef = React.useRef(paystackProps.PayStackRef);
  const [refreshing, setRefreshing] = useState(false);
  const [paymentProps, setPaymentProps] = useState(null);
  const [loading, setLoading] = useState(false);
  const initAddCard = async () => {
    setLoading(true);
    try {
      const res = (await client.get("/customer/card-details/add")).data;

      setPaymentProps(res.data);
      paystackWebViewRef.current?.startTransaction();
    } catch (error) {
      console.log("error adding card", error.response);
    }
    setLoading(false);
  };

  const saveCard = async (referenceId) => {
    setLoading(true);
    try {
      const res = (
        await client.post("/customer/card-details/verify", {
          txRef: referenceId,
        })
      ).data;

      getCurrentUser(authDispatch);

      Alert.alert("Card added successfully");
    } catch (error) {
      console.log("error", errorMessage(error));
      FlashMessage({
        title: "Couldn't save card",
        message: errorMessage(error),
        duration: 4000,
        type: "error",
      });
    }
    setLoading(false);
  };

  const deleteCardHandler = (paymentDetailsId) => {
    Alert.alert("Remove card", "Are you sure you want to delete this card?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Remove",
        style: "destructive",
        onPress: async () => {
          setLoading(true);
          try {
            const res = (
              await client.post(`/customer/card-details/delete`, {
                paymentDetailsId,
              })
            ).data;
            getCurrentUser(authDispatch);
            showFlashMessage({
              title: "Card removed successfully",
              message: "Your card has been removed successfully",
              duration: 4000,
              actions: [
                {
                  title: "Hmmm, ok!",
                  onPress: () => navigation.navigate(WALLET_SCREEN),
                },
              ],
              type: "success",
            });
          } catch (error) {
            console.log("error", errorMessage(error));
            showFlashMessage({
              title: "Couldn't delete card",
              message: errorMessage(error),
              type: "error",
              duration: 4000,
              actions: [
                {
                  title: "Ooops",
                  onPress: () => navigation.navigate(WALLET_SCREEN),
                },
              ],
            });
          }
          setLoading(false);
        },
      },
    ]);
  };

  //   title: "Card added successfully",
  //   message: `Your wallet has been credited with `,

  //   duration: 4000,
  //   actions: [
  //     {
  //       title: "Awwwn Thanks",
  //       // onPress: () => navigation.navigate(WALLET_SCREEN),
  //     },
  //   ],
  //   type: "success",
  // });
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
              Payment details
            </Typography>
          }
        />
        <Divider />

        <Paystack
          billingEmail={data?.email}
          amount={paymentProps?.cardPaymentAmount}
          paystackKey={PAYSTACK_KEY}
          activityIndicatorColor={colors.primary.main}
          onSuccess={(res) => {
            saveCard(res.data.transactionRef.reference);
          }}
          onCancel={() => {
            console.log("canceled");
          }}
          refNumber={paymentProps?.tx_ref}
          ref={paystackWebViewRef}
        />

        {steps === 0 && (
          <View style={styles.empty}>
            <Image
              source={require("../../assets/img/addressbook.png")}
              style={styles.Image}
            />
            <Typography gutterBottom={20} variant="h5" fontWeight={600}>
              You have no saved address
            </Typography>
            <Button
              start={
                <Entypo
                  name="plus"
                  size={24}
                  style={{ marginRight: 5 }}
                  color={colors.light.main}
                />
              }
              title="Add a new address"
              fullWidth
            />
          </View>
        )}
        {steps === 1 && (
          <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
            {data.paymentIntentDetails?.map((cur, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.address, { backgroundColor: colors.light.main }]}
              >
                <Row justifyContent={"space-between"}>
                  <Row gap={10}>
                    <Image
                      source={require("../../assets/img/card.png")}
                      style={styles.card}
                    />
                    <View>
                      <Typography gutterBottom={4} fontWeight={600}>
                        {cur.bankName}
                      </Typography>
                      <Typography gutterBottom={4}>
                        **** **** {cur.lastFour}
                      </Typography>
                      <Typography variant="caption">
                        EXP {cur.expMonth}/{cur.expYear}
                      </Typography>
                    </View>
                  </Row>
                  <TouchableOpacity
                    onPress={() => {
                      deleteCardHandler(cur._id);
                    }}
                  >
                    <MaterialIcons
                      name="delete-outline"
                      size={24}
                      color="red"
                    />
                  </TouchableOpacity>
                </Row>
              </TouchableOpacity>
            ))}

            {/* <TouchableOpacity
              style={[styles.address, { backgroundColor: colors.light.main }]}
            >
              <Row justifyContent={"space-between"}>
                <Row gap={10}>
                  <Image
                    source={require("../../assets/img/card.png")}
                    style={styles.card}
                  />
                  <View>
                    <Typography gutterBottom={4} fontWeight={600}>
                      GTB card
                    </Typography>
                    <Typography gutterBottom={4}>**** **** 6767</Typography>
                    <Typography variant="caption">EXP 02/22</Typography>
                  </View>
                </Row>
                <TouchableOpacity>
                  <MaterialIcons name="delete-outline" size={24} color="red" />
                </TouchableOpacity>
              </Row>
            </TouchableOpacity> */}
          </ScrollView>
        )}
      </SafeAreaView>
      <View style={styles.action}>
        <Button
          start={
            <Entypo
              name="plus"
              size={24}
              style={{ marginRight: 5 }}
              color={colors.light.main}
            />
          }
          onPress={() => {
            initAddCard();
          }}
          title="Add a new Card"
          fullWidth
        />
      </View>
    </View>
  );
}
const styles = ScaledSheet.create({
  root: {
    padding: "15@s",
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "30@s",
  },
  Image: {
    width: "200@s",
    height: "200@s",
    resizeMode: "contain",
    marginBottom: 10,
  },
  address: {
    padding: "15@s",
    marginBottom: 20,
  },
  card: {
    height: "60@s",
    width: "70@s",
    resizeMode: "contain",
  },
  action: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    padding: 30,
  },
});
export default Paymentdetails;
