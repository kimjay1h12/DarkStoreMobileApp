import React, { useContext } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Button,
  SafeAreaView,
  Typography,
  useColors,
} from "../../src/Hoddy-ui";
import Header from "../../components/custom/Header";
import Divider from "../../components/custom/Divider";
import {
  AntDesign,
  Entypo,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Row from "../../components/custom/Row";
import { Paystack, paystackProps } from "react-native-paystack-webview";
import { ScaledSheet } from "react-native-size-matters";
import { GLobalContext } from "../../src/context";
import AddressCard from "../../components/address/AddressCard";
import { ADDADDRESS, MYORDERS } from "../../src/navigation/routes";
import { checlout } from "../../src/context/actions/cart";
import { checkout } from "../../src/context/actions/orders";
import { Alert } from "react-native";
import { PAYSTACK_KEY } from "../../api/config";
function Checkout({ navigation, route }) {
  const [paymentProps, setPaymentProps] = React.useState(null);
  const paystackWebViewRef = React.useRef(paystackProps.PayStackRef);
  const { data } = route.params;
  const { authState, ordersDispatch, ordersState } = useContext(GLobalContext);
  const colors = useColors();
  const [showAddress, setShowAddress] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    address: "",
    coordinates: [],
  });
  const CheckOutItem = async () => {
    setLoading(true);
    const res = await checkout(formData, ordersDispatch);
    setPaymentProps(res);

    if (res) {
      paystackWebViewRef?.current?.startTransaction();
      setLoading(false);
    }
    setLoading(false);
  };

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
              Checkout
            </Typography>
          }
        />
        <Divider />

        <Paystack
          paystackKey={PAYSTACK_KEY}
          amount={data.totalPrice || 0}
          billingEmail={authState.data?.email}
          billingName={authState.data.firstName}
          billingMobile={authState.data?.phoneNumber}
          activityIndicatorColor="#555"
          onCancel={(e) => {}}
          refNumber={paymentProps?.txInfo?.tx_ref}
          ref={paystackWebViewRef}
          onSuccess={async () => {
            Alert.alert("Success", "ORder created successfully");
            navigation.navigate(MYORDERS);
          }}
        />

        <View style={{ flex: 1, marginTop: 20, paddingHorizontal: 15 }}>
          <View>
            <Typography
              gutterBottom={6}
              variant="h6"
              fontWeight={600}
              color="grey"
            >
              Your order
            </Typography>
            <Typography gutterBottom={10}>
              {data?.items?.length} Products
            </Typography>
            <Row justifyContent="space-between">
              <Row gap={10}>
                {data?.items?.slice(0, 5).map((cur, i) => (
                  <Image
                    source={{ uri: cur.itemId?.image }}
                    key={i}
                    style={styles.image}
                  />
                ))}
              </Row>
              {data?.items?.length > 5 && (
                <Button
                  size="small"
                  variant="outlined"
                  style={{ borderRadius: 2, width: "30%" }}
                  title={"+ " + (data?.items?.length - 5) + " more"}
                />
              )}
            </Row>

            <Row justifyContent={"space-between"} mt={30}>
              <Row gap={10}>
                <MaterialCommunityIcons
                  name="truck-delivery-outline"
                  size={24}
                  color="black"
                />
                <TouchableOpacity
                  onPress={() => {
                    setShowAddress(!showAddress);
                  }}
                >
                  <Typography variant="h6" fontWeight={600}>
                    Shipped To
                  </Typography>
                </TouchableOpacity>
              </Row>
              <TouchableOpacity
                onPress={() => {
                  setShowAddress(!showAddress);
                }}
              >
                {showAddress ? (
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    size={30}
                    color="black"
                  />
                ) : (
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={30}
                    color="black"
                  />
                )}
              </TouchableOpacity>
            </Row>
            {formData.address != "" && (
              <View
                style={{
                  borderWidth: 0.7,
                  borderColor: "#aaa",
                  paddingVertical: 6,
                  paddingHorizontal: 15,
                  borderRadius: 10,
                  marginTop: 10,
                }}
              >
                <AddressCard
                  showLabel={false}
                  color={true}
                  divider={false}
                  checked={true}
                  description={formData?.address}
                  number={authState?.data?.phoneNumber}
                />
              </View>
            )}
            <ScrollView showsHorizontalScrollIndicator={false}>
              {showAddress && (
                <View style={{ marginBottom: 80 }}>
                  {authState?.data?.address?.map((cur, i) => (
                    <AddressCard
                      type={cur.label}
                      color={true}
                      divider={false}
                      label={cur.label}
                      key={i}
                      description={cur.description}
                      number={authState?.data?.phoneNumber}
                      checked={formData.address === cur.description}
                      onPress={() => {
                        setFormData({
                          ...formData,
                          address: cur.description,
                          coordinates: cur.addressCoordinates,
                        });
                        setShowAddress(false);
                      }}
                    />
                  ))}
                  <Button
                    style={{ marginTop: 20 }}
                    title="Add New Address"
                    fullWidth
                    size="small"
                    onPress={() => {
                      navigation.navigate(ADDADDRESS, { ischeckout: true });
                    }}
                  />
                </View>
              )}
            </ScrollView>
          </View>
          {showAddress === false && (
            <View style={styles.bottom}>
              <View>
                <Row justifyContent={"space-between"}>
                  <Typography>Subtotal:</Typography>
                  <Typography> ₦ {data?.originalPrice}</Typography>
                </Row>
                <Row mt={15} justifyContent={"space-between"}>
                  <Typography>Discount:</Typography>
                  <Typography color="info">- ₦200</Typography>
                </Row>
                <Row mt={15} justifyContent={"space-between"}>
                  <Typography>Delivery Fee:</Typography>
                  <Typography>₦ 200</Typography>
                </Row>

                <Divider />
                <Row mt={15} mb={30} justifyContent={"space-between"}>
                  <Typography fontWeight={600} variant="h5">
                    Total: ₦ {data?.totalPrice}
                  </Typography>
                  <Button
                    disabled={
                      formData.address === "" ||
                      formData.coordinates.length === 0
                    }
                    loading={loading}
                    title="CheckOut"
                    variant="outlined"
                    size="small"
                    onPress={() => {
                      CheckOutItem();
                    }}
                    end={
                      <AntDesign name="arrowright" size={24} color="black" />
                    }
                  />
                </Row>
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}
const styles = ScaledSheet.create({
  image: {
    height: "30@s",
    width: "30@s",
    resizeMode: "contain",
    borderRadius: 15,
  },
  bottom: {
    position: "absolute",
    bottom: 0,

    paddingHorizontal: "15@s",
    width: Dimensions.get("window").width,
  },
});
export default Checkout;
