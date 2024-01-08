import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Button, Typography, useColors } from "../../src/Hoddy-ui";
import { ScaledSheet } from "react-native-size-matters";
import Row from "../custom/Row";
import { TRACKORDER } from "../../src/navigation/routes";

function OrderItem({
  onPress = () => {},

  status,


  index,
  item,
  navigation
}) {
  const colors = useColors();
  const styles = ScaledSheet.create({
    root: {
      padding: "15@s",
      borderRadius: 10,
      minHeight: "70@s",
      flex: 0,
      justifyContent: "space-between",
      flexDirection: "column",
      gap: 10,
      marginBottom: 15,
    },
    product: {
      flex: 0,
      flexDirection: "row",
      alignItems: "center",
      gap: 20,
    },
    productimage: {
      height: "30@s",
      width: "30@s",
      borderRadius: 20,
      resizeMode: "contain",
    },
  });
  return (
    <TouchableOpacity
      onPress={()=>{navigation.navigate(TRACKORDER,{data:item,name:`DSORDER ${index +1}`})}}
      style={[styles.root, { backgroundColor: colors.white[4] }]}
    >
   
        <Row justifyContent="space-between" align="flex-start">
          <View style={{ width: "80%" }}>
        
            <Typography  variant="body2">
              Order No: DSORDER {index +1}
            </Typography>
          </View>
          <View>
            <View
              style={{
                backgroundColor:
                 colors.white[2],
                padding: 7,
                flex: 0,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
              }}
            >
              <Typography fontWeight={700} variant="caption">
                {status?.toUpperCase()}
              </Typography>
            </View>

         
          </View>
        </Row>
   

  
      <Row justifyContent="space-between">
        <Typography variant="h6" fontWeight={700} color="grey">
          ₦ {item?.total}
        </Typography>
      <Typography>
        {item?.cartData?.length} Items
      </Typography>
      </Row>
    </TouchableOpacity>
  );
}

export default OrderItem;
