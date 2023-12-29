import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { colors, Typography, useColors } from "../../Hoddy-ui";

const Dropdown = ({ text, desc, id }: any) => {
  const colors = useColors();
  const [drop, setDrop] = useState(false);
  const { width, height } = useWindowDimensions();
  const showDropdownHandler = () => {
    setDrop((prev) => !prev);
  };
  const styles = StyleSheet.create({
    titleFlex: {
      flexDirection: "row",
    },
    greyLine: {
      height: 1,
      width,
      backgroundColor: "#D0D5DD",
      marginTop: 8,
    },
    dot: {
      backgroundColor: colors.grey.main,
      height: 5,
      width: 5,
      borderRadius: 50,
      marginTop: 8,
    },
  });
  return (
    <>
      <View
        key={id}
        style={{
          backgroundColor: `${drop ? "#E6F4FF" : "white"}`,
          padding: 20,
          maxWidth: width,
        }}
      >
        <TouchableOpacity
          onPress={showDropdownHandler}
          style={styles.titleFlex}
        >
          <View style={styles.dot} />
          <View style={{ flex: 1 }}>
            <Typography
              variant="body1"
              fontWeight={500}
              style={{
                marginRight: 30,
                marginLeft: 14,
              }}
            >
              {text}
            </Typography>
          </View>
          <AntDesign
            name={drop ? "minuscircleo" : "pluscircleo"}
            size={24}
            color={colors.blue.main}
          />
        </TouchableOpacity>
        {drop ? (
          <Typography
            variant="body1"
            style={{
              marginHorizontal: 14,
              marginTop: 16,
            }}
          >
            {desc}
          </Typography>
        ) : null}
      </View>
      <View style={styles.greyLine} />
    </>
  );
};

export default Dropdown;
