import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  AdaptiveStatusBar,
  Typography,
  useColors,
  useNavScreenOptions
} from "../Hoddy-ui";

import { Feather, MaterialIcons,Entypo } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useContext } from "react";
import { View } from "react-native";
import Home from "../../screens/Home";
import Basket from "../../screens/tabs/Basket";
import Favourite from "../../screens/tabs/Favourite";
import Shop from "../../screens/tabs/Shop";
import { GLobalContext } from "../context";
import { getCurrentUser } from "../context/actions/authAction";
import { getCart } from "../context/actions/cart";
import { getFavourite, getOrders } from "../context/actions/orders";
import { GetAllProducts, GetAllPromotions } from "../context/actions/products";
import { HOME_SCREEN } from "./routes";
import Orders from "../../screens/tabs/Orders";

const Tabs = createBottomTabNavigator();

const TabNavigation = () => {
  const colors = useColors();
  const options = useNavScreenOptions("tab");
  const {
    authState,
    authDispatch,
    productDispatch,
    promotionDispatch,
    cartDispatch,
    cartState,
    ordersDispatch,
    favouriteDispatch,
  } = useContext(GLobalContext);
  useFocusEffect(
    useCallback(() => {
      const { token } = authState.data;
      if (token)
        setTimeout(() => {
          getCurrentUser(authDispatch);
          GetAllProducts(productDispatch);
getCart(cartDispatch)
          GetAllPromotions(promotionDispatch);
          getCart(cartDispatch);
          getOrders(ordersDispatch);
          getFavourite(favouriteDispatch);
        }, 300);
    }, [authState.data.token])
  );

  return (
    <>
      <AdaptiveStatusBar />
      <Tabs.Navigator
        sceneContainerStyle={{
          backgroundColor: colors.white[1],
        }}
        screenOptions={{
          ...options,
 
          tabBarItemStyle: {
            // backgroundColor: "#f90",
            alignSelf: "center",
          },
        }}
      >
        <Tabs.Screen
          name={HOME_SCREEN}
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: (props) => (
              <Ionicons name="home-outline" size={props.size} color={props.color} />
            ),
          }}
        />
        <Tabs.Screen
          name={"Shop"}
          component={Shop}
          options={{
            headerShown: false,
            tabBarIcon: (props) => (
              <Entypo name="shop" size={props.size} color={props.color} />
            ),
          }}
        />
        {/* <Tabs.Screen
          name="Explore"
          component={Explore}
          options={{
            headerShown: false,
            tabBarIcon: (props) => (
              <Feather name="search" size={props.size} color={props.color} />
            ),
          }}
        /> */}
        <Tabs.Screen
          name={"Cart"}
          component={Basket}
          options={{
            headerShown: false,
            tabBarIcon: (props) => (
              <View>
                <Ionicons
                  name="cart-outline"
                  size={props.size}
                  color={props.color}
                />
                {cartState.data?.cartData?.length > 0 && (
                  <View
                    style={{
                      position: "absolute",
                      right: -10,
                      top: 0,
                      backgroundColor: colors.primary.main,
                      borderRadius: 20,
                      height: 18,
                      width: 18,
                      flex: 0,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography style={{color:"#fff"}}>
                      {cartState.data?.cartData?.length}
                    </Typography>
                  </View>
                )}
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name={"My Orders"}
          component={Orders}
          options={{
            headerShown: false,
            tabBarIcon: (props) => (
              <Ionicons
                name="reorder-three-outline"
                size={props.size}
                color={props.color}
              />
            ),
          }}
        />
        {/* <Tabs.Screen
          name={"Account"}
          component={Account}
          options={{
            headerShown: false,
            tabBarIcon: (props) => (
              <Feather name="user" size={props.size} color={props.color} />
            ),
          }}
        /> */}
      </Tabs.Navigator>
    </>
  );
};

export default TabNavigation;
