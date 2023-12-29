import React from "react";
import { View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

function Row({
  children,
  justifyContent,
  direction = "row",
  align = "center",
  mt,
  mb,
  p,
  gap,
}) {
  return (
    <View
      style={{
        flex: 0,
        flexDirection: direction,
        justifyContent: justifyContent,
        alignItems: align,
        marginTop: mt,
        marginBottom: mb,
        padding: p,
        gap: gap,
      }}
    >
      {children}
    </View>
  );
}

export default Row;
