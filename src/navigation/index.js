import React, { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useNavScreenOptions } from "../Hoddy-ui";

import client from "../../api/client";
import Onboarding from "../../screens/Onboarding";
import Addressbook from "../../screens/account/Addressbook";
import Changepassword from "../../screens/account/Changepassword";
import Help from "../../screens/account/Help";
import Mydetails from "../../screens/account/Mydetails";
import Myorders from "../../screens/account/Myorders";
import Paymentdetails from "../../screens/account/Paymentdetails";
import Promotion from "../../screens/account/Promotion";
import Referral from "../../screens/account/Referral";
import Add from "../../screens/address/Add";
import Login from "../../screens/auth/Login";
import Signup from "../../screens/auth/Signup";
import Order from "../../screens/help/Orders";
import SingleOrder from "../../screens/help/SingleOrder";
import AddPaymentdetails from "../../screens/payment/Add";

import ViewCategory from "../../screens/products/ViewCategory";
import ViewProducts from "../../screens/products/ViewProducts";
import { GLobalContext } from "../context";
import TabNavigation from "./TabNavigation";
import {
  ACCOUNT,
  ADDADDRESS,
  ADDPAYMENTDETAILS,
  ADDRESSBOOK,
  CHANGEPASSWORD,
  CHECKOUT,
  FORGOTTENPASSWORD,
  GETHELP,
  LOGIN_SCREEN,
  MYDETAILS,
  MYORDERS,
  ONBOARDING_SCREEN,
  ORDERHELP,
  OTPSCREEN,
  PAYMENTDETAILS,
  PEFERENCESCREEN,
  PRODUCT_DETAILS,
  PROMOTION,
  REFERRAL,
  SIGNUP_SCREEN,
  SINGLEORDER,
  TABS_NAVIGATOR,
  TRACKORDER,
  VIEWBYCATEGORY,
  VIEWGETCATEGORY,
  VIEWPRODUCTS,
  VIEWPRODUCTSBYBRANDS,
} from "./routes.js";

import Checkout from "../../screens/checkout/Checkout";
import OrderTracking from "../../screens/orders/OrderTracking";
import GetCategory from "../../screens/products/GetCategory";
import OtpScreen from "../../screens/auth/OtpScreen";
import Preferences from "../../screens/auth/Preferences";
import ForgottenPassword from "../../screens/auth/ForgottenPassword";
import Details from "../../screens/products/Details";
import Account from "../../screens/account/Account";
import { getCart } from "../context/actions/cart";
import ViewBrands from "../../screens/products/ViewBrands";

const Stack = createNativeStackNavigator();
// SplashScreen.preventAutoHideAsync();

const AppNavigator = () => {
  const options = useNavScreenOptions("stack");
  const {
    authState: { isOtpVerfified, data, loggedIn },
    authDispatch,
    productDispatch,
    promotionDispatch,
    cartDispatch,
  } = useContext(GLobalContext);
  useEffect(() => {
    client.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    getCart(cartDispatch)
  }, [data.token]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ ...options }}>
      
      <Stack.Screen name={ONBOARDING_SCREEN} component={Onboarding} />
      <Stack.Screen name={TABS_NAVIGATOR} component={TabNavigation} />
       
              {!data?.isMailVerified && (
                <Stack.Screen name={OTPSCREEN} component={OtpScreen} />
              )}
                 <Stack.Screen name={SIGNUP_SCREEN} component={Signup} />
              <Stack.Screen name={LOGIN_SCREEN} component={Login} />
              <Stack.Screen
                name={FORGOTTENPASSWORD}
                component={ForgottenPassword}
              />
              <Stack.Screen name={PRODUCT_DETAILS} component={Details} />
              <Stack.Screen name={ADDADDRESS} component={Add} />
              <Stack.Screen name={MYDETAILS} component={Mydetails} />
              <Stack.Screen name={CHANGEPASSWORD} component={Changepassword} />
              <Stack.Screen name={MYORDERS} component={Myorders} />
              <Stack.Screen name={REFERRAL} component={Referral} />
              <Stack.Screen name={PROMOTION} component={Promotion} />
              <Stack.Screen name={GETHELP} component={Help} />
              <Stack.Screen name={ORDERHELP} component={Order} />
              <Stack.Screen name={SINGLEORDER} component={SingleOrder} />
              <Stack.Screen name={ADDRESSBOOK} component={Addressbook} />
              <Stack.Screen name={PAYMENTDETAILS} component={Paymentdetails} />
              <Stack.Screen name={VIEWBYCATEGORY} component={ViewCategory} />
              <Stack.Screen name={VIEWPRODUCTS} component={ViewProducts} />
              <Stack.Screen name={CHECKOUT} component={Checkout} />
              <Stack.Screen name={VIEWGETCATEGORY} component={GetCategory} />
              <Stack.Screen name={VIEWPRODUCTSBYBRANDS} component={ViewBrands} />
              <Stack.Screen name={ACCOUNT} component={Account} />
              <Stack.Screen
                name={ADDPAYMENTDETAILS}
                component={AddPaymentdetails}
              />
              <Stack.Screen name={TRACKORDER} component={OrderTracking} />
      
           
          
       
       
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
