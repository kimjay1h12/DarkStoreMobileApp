import React from "react";
import { ActivityIndicator, Dimensions, View } from "react-native";

import { ScaledSheet } from "react-native-size-matters";
import { useColors } from "../hooks";
import { SpinnerProps } from "../types";
import Typography from "./Typography";

const Spinner: React.FC<SpinnerProps> = ({
  label,
  size = "large",
  color = "primary",
  fullscreen = false,
  style = {},
}) => {
  const colors = useColors();
  const styles: any = ScaledSheet.create({
    root: {
      width: fullscreen ? Dimensions.get("screen").width : "100%",
      height: fullscreen ? Dimensions.get("screen").height : "100%",
      left: 0,
      bottom: 0,
      zIndex: 100,
      alignItems: "center",
      justifyContent: "center",
      position: fullscreen ? "absolute" : "relative",
      backgroundColor: fullscreen ? colors.white[1] + "d" : undefined,
      ...style,
    },
    content: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: "15@vs",
      paddingHorizontal: "20@s",
      borderRadius: 10,
      // backgroundColor: fullscreen ? colors.light.main : null,
    },
    label: {
      color: color === "light" ? colors.white[2] : colors.black[4],
    },
  });

  return (
    <View style={styles.root}>
      <View style={styles.content}>
        <ActivityIndicator color={"#fff"} size={size} />
        {label && (
          <Typography
            align="center"
            variant="h4"
            fontWeight={600}
            style={styles.label}
          >
            {label}
          </Typography>
        )}
      </View>
    </View>
  );
};

export default Spinner;
