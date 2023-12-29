import React from "react";
import { View, StyleSheet } from "react-native";

const VerticalDivider = () => {
  return <View style={styles.verticalDivider} />;
};

const styles = StyleSheet.create({
  verticalDivider: {
    width: 1, // Set the width of the vertical line
    height: "100%", // Set the height to fill the container
    backgroundColor: "#ccc", // Set the color of the divider
    marginHorizontal: 10, // Optional margin for spacing
  },
});

export default VerticalDivider;
