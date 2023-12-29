import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CheckboxProps } from "../types";
import { useColors } from "../hooks";

const CheckBox: FC<CheckboxProps> = ({
  checked,
  color = "primary",
  setChecked,
}) => {
  const colors = useColors();
  const iconName = checked ? "checkbox-marked" : "checkbox-blank-outline";

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setChecked(!checked)}>
        <MaterialCommunityIcons
          name={iconName}
          size={24}
          color={colors[color].main}
        />
      </Pressable>
    </View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",

    marginTop: 5,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    color: "#000",
    marginLeft: 5,
    fontWeight: "600",
  },
});
