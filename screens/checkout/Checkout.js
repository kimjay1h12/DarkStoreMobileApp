import {
  Ionicons,
  MaterialIcons
} from "@expo/vector-icons";
import React, { useContext } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Paystack, paystackProps } from "react-native-paystack-webview";
import { ScaledSheet } from "react-native-size-matters";
import Divider from "../../components/custom/Divider";
import Header from "../../components/custom/Header";
import Row from "../../components/custom/Row";
import {
  Button,
  Typography,
  useColors
} from "../../src/Hoddy-ui";
import { GLobalContext } from "../../src/context";
import { checkout, createOrders } from "../../src/context/actions/orders";
import { currencyFormatter, generateTransactionReference } from "../../utility";
import { ADDADDRESS } from "../../src/navigation/routes";
import { PAYSTACK_KEY } from "../../api/config";
import { DeleteAllItemsFromCart } from "../../src/context/actions/cart";
function Checkout({ navigation, route, data }) {
  const [paymentProps, setPaymentProps] = React.useState(null);
  const paystackWebViewRef = React.useRef(paystackProps.PayStackRef);

  const { authState, ordersDispatch, cartState ,cartDispatch} = useContext(GLobalContext);
  const colors = useColors();
  const [showAddress, setShowAddress] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    address: "",
    coordinates: [],
  });
  const CheckOutItem = async () => {
    setLoading(true);
    const res = await createOrders({
   ...cartState.data
    }, ordersDispatch);
    setPaymentProps(res);

    if (res) {
      const res = DeleteAllItemsFromCart(cartDispatch)
      navigation.navigate("My Orders")
      setLoading(false);
    }
    setLoading(false);
  };
const IntializeTransaction = async () => {
  try {
    const res = generateTransactionReference()
    setPaymentProps({
      tx_ref:res
    })
    paystackWebViewRef?.current?.startTransaction();

  } catch (error) {
    
    
  }
}
const styles = ScaledSheet.create({
  image: {
    height: "30@s",
    width: "30@s",
    resizeMode: "contain",
    borderRadius: 15,
  },
  content: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor:colors.white[2],
    marginTop: 10,
    paddingTop: 30,
    padding: "15@s",
    minHeight: "100%",
  },
  icon: {
    padding: 10,
    backgroundColor: colors.white[4],
    borderRadius: 100,
    paddingLeft: 15,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    marginTop: 10,
    backgroundColor: colors.white[4],
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
    padding: 15,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottom: {
    position: "absolute",
    bottom: 70,

    paddingHorizontal: "15@s",
    width: Dimensions.get("window").width,
  },
});
  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
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
          <Typography variant="h6" fontWeight={600} align="center">
            Checkout
          </Typography>
        }
      />



      <View style={styles.content}>
            <Paystack
          paystackKey={PAYSTACK_KEY}
          amount={cartState?.data?.total|| 0}
          billingEmail={authState.data?.email}
          billingName={authState.data?.name}
          billingMobile={authState.data?.phoneNumber}
          activityIndicatorColor="#555"
          onCancel={(e) => {}}
          refNumber={paymentProps?.tx_ref}
          ref={paystackWebViewRef}
          onSuccess={async () => {
            CheckOutItem()

          }}
        /> 
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Typography
              gutterBottom={6}
              variant="h6"
              fontWeight={600}
              color="grey"
            >
              Order Summary
            </Typography>
            <Row justifyContent={"space-between"} mt={10}>
              <Typography>Products Total (2)</Typography>
              <Typography fontWeight={500}>
                {currencyFormatter(200000)}
              </Typography>
            </Row>
            <Row justifyContent={"space-between"} mt={15}>
              <Typography gutterBottom={10}>Delivery Fees</Typography>
              <Typography fontWeight={500}>
                {currencyFormatter(2000)}
              </Typography>
            </Row>

            <Divider />
            <Row justifyContent={"space-between"} mb={5} mt={5}>
              <Typography>Total</Typography>
              <Typography fontWeight={500}>
                {currencyFormatter(200000)}
              </Typography>
            </Row>
            <Divider />
            <Typography
              gutterBottom={6}
              variant="h6"
              fontWeight={600}
              color="grey"
              style={{ marginTop: 10 }}
            >
              Payment Method
            </Typography>
            <View style={styles.container}>
              <Row gap={10}>
                <Image
                  source={require("../../assets/img/paystack.jpeg")}
                  style={{ height: 30, width:30, resizeMode: "contain" }}
                />
                <Typography fontWeight={500} variant="h6">
                  PayStack
                </Typography>
              </Row>
            </View>
            <Row justifyContent={"space-between"}>
            <Typography
              gutterBottom={6}
              variant="h6"
              fontWeight={600}
              color="grey"
              style={{ marginTop: 10 }}
            >
              Delivery Address
            </Typography>
            <TouchableOpacity  onPress={()=>{navigation.navigate(ADDADDRESS)}}>
              <Typography  fontWeight={600}>Change</Typography>
            </TouchableOpacity>
            </Row>
            <View style={styles.container}>
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
       <View style={{justifyContent:"flex-end",height:"44%"}}>
<Button title="Place Your Order" onPress={()=>{IntializeTransaction()}} fullWidth/>
       </View>
          </View>
        </ScrollView>

      </View>
    </View>
  );
}

export default Checkout;
