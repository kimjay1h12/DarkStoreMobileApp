import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

interface DividerProps {
  style?: ViewStyle;
}

const Divider: React.FC<DividerProps> = ({ style }) => {
  return <View style={[styles.divider, style]} />;
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: "gray",
    marginVertical: 10,
  },
});

export default Divider;
