import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { useColors } from "../../src/Hoddy-ui";

function RadioButton(props) {
  const colors = useColors();
  return (
    <TouchableOpacity style={styles.radioButton} onPress={props.onPress}>
      <Icon
        name={props.checked ? "dot-circle-o" : "circle-o"}
        type="font-awesome"
        color={props.checked ? colors.primary.main : "black"}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  label: {
    marginLeft: 10,
  },
});

export default RadioButton;
