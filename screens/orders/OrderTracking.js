import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Divider from "../../components/custom/Divider";
import Header from "../../components/custom/Header";
import Row from "../../components/custom/Row";
import TrackingItem from "../../components/orders/TrackingItem";
import {
  Typography,
  useColors
} from "../../src/Hoddy-ui";
import VerticalStepper from "../../src/Hoddy-ui/Components/VerticalStepper";
import { GLobalContext } from "../../src/context";
import { currencyFormatter } from "../../utility";
const testarray = [
  {
    label: 'Order Placed ',
    value: 'test2',
    details: 'We have received your order',
    time: '10:30AM',
  },
  {
    label: 'Order Confirmed ',
    value: 'test2',
    details: 'Your order has been confirmed',
    time: '10:30AM',
  },
  {
    label: 'Order Processed ',
    value: 'test2',
    details: 'We are preparing your order',
    time: '10:30AM',
  },
  {
    label: 'Order Completed ',
    value: 'test2',
    details: 'Your order is on the way',
  },
];
function OrdersTracking({ navigation,route }) {
  const {
    authState,


  } = React.useContext(GLobalContext);
  const colors = useColors();
const {name,data}= route.params
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
                left={
                  <TouchableOpacity
                    style={styles.icon}
                    onPress={() => {
                      navigation.goBack();
                    }}
                  >
                    <MaterialIcons
                    style={{marginLeft:5}}
                      name="arrow-back-ios"
                      size={24}
                      color={colors.dark.main}
                    />
                  </TouchableOpacity>
                }
        center={
          <Typography style={{ marginTop: 10 }} variant="h4" fontWeight={600}>
           Tracking 
          </Typography>
        }
 
      />


      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Row  justifyContent={"space-between"}>
          <Typography  variant="h6"  fontWeight={600}>{name}</Typography>
          <Typography>{currencyFormatter(data?.total)}</Typography>
          </Row>
          <Divider style={{marginBottom:40}}/>
          <View  style={{marginBottom:30}}>
        {
          data?.cartData?.map((cur,i)=>(
            <TrackingItem {...cur} key={i}/>
          ))
        }
       </View>

        <VerticalStepper steps={testarray} activeSteps={[0,]} />
      

          
       
        </View>
      </ScrollView>
    </View>
  );
}

export default OrdersTracking;
