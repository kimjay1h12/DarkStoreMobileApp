import React from "react";
import { StyleSheet, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { useColors } from "../../src/Hoddy-ui";

function Header({ left, center,content,right }) {
  const colors =useColors()
  const styles = ScaledSheet.create({
    header: {
  
      backgroundColor:  colors.white[2],
  
        minHeight: "100@vs",
        // marginTop: "-3%",
    flexDirection:"column",
        padding: "15@s",
        paddingTop: "36@vs",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
  
    
  
    },
    icon: {
      padding: 10,
      backgroundColor: "#e7e7e7",
      borderRadius: 100,
      width: 60,
      height: 60,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  return (
    <View style={styles.header}>

<View style={{    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between", // This pushes the left object to the left and the centered object to the center
    alignItems: "center",}}>
    
      <View style={{ width: "33.3%" }}>{left}</View>

      <View style={{ alignSelf: "center" }}>{center}</View>
      <View style={{ width: "33.3%" }}>{right}</View>
      </View>  
 
      <View  >
{content}
      </View>   
    </View>      
  );
}

export default Header;
