import React from "react";
import { Text, StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useColors } from "../hooks";
import { TypographyProps } from "../types";

const Typography: React.FC<TypographyProps> = ({
  children,
  color = "dark",
  style = {},
  textCase = null,
  variant = "body1",
  align = "left",
  gutterBottom = 0,
  fontWeight = 300,
}) => {
  const colors = useColors();
  const fontSize = {
    h1: moderateScale(40),
    h2: moderateScale(37),
    h3: moderateScale(30),
    h4: moderateScale(24),
    h5: moderateScale(19),
    h6: moderateScale(15),
    body1: moderateScale(13),
    body2: moderateScale(12),
    caption: moderateScale(9),
  };
  const styles: any = StyleSheet.create({
    text: {
      
      fontSize: fontSize[variant],
      marginBottom: verticalScale(gutterBottom) || 0,
      color: colors[color]?.main || color,
      textTransform: textCase,
      alignItems: "center",
      textAlign: align,
      fontWeight: fontWeight.toString(),
    },
  });
  return (
    <Text adjustsFontSizeToFit style={{ ...styles.text, ...style }}>
      {children}
    </Text>
  );
};

export default Typography;
