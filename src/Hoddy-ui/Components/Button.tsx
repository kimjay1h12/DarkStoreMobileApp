import React from "react";
import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { moderateScale, scale, ScaledSheet } from "react-native-size-matters";
import { useColors } from "../hooks";
import { ButtonProps, IconButtonProps, LinkButtonProps } from "../types";

export const LinkButton: React.FC<LinkButtonProps> = ({
  title,
  style = {},
  color = "blue",
  fontSize = 12,
  fontWeight = "400",
  disabled,
  onPress = () => {},
}) => {
  const colors = useColors();

  const styles: any = ScaledSheet.create({
    text: {
      fontSize: moderateScale(fontSize),
      fontWeight: fontWeight,
      color: disabled ? "#777" : colors[color].main,
    },
  });
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Text style={{ ...styles.text, ...style }}>{title}</Text>
    </TouchableOpacity>
  );
};

export const IconButton: React.FC<IconButtonProps> = ({
  style = {},
  color = "dark",
  disabled,
  icon,
  elevation,
  bg = false,
  size = 24,
  containerStyles = {},
  onPress = () => {},
}) => {
  const colors = useColors();

  const styles: any = ScaledSheet.create({
    container: {
      alignSelf: "flex-start",
      flexGrow: 0,
      backgroundColor: bg
        ? colors.white[1]
        : elevation! > 0
        ? colors.white[1]
        : null,
      padding: "5@ms",
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowOffset: {
        height: 1,
        width: 0,
      },
      height: bg ? size + 20 + "@ms" : undefined,
      width: bg ? size + 20 + "@ms" : undefined,
      alignItems: "center",
      justifyContent: "center",
      shadowRadius: elevation,
      elevation: elevation,
      borderRadius: size,
    },
    text: {
      color: disabled ? "#777" : colors[color].main,
    },
  });
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.3}
      style={{ ...styles.container, ...containerStyles }}
    >
      <MaterialIcons
        style={{ ...styles.text, ...style }}
        name={icon}
        size={size}
      />
    </TouchableOpacity>
  );
};

const Button: React.FC<ButtonProps> = ({
  elevation = 0,
  onPress = () => {},
  disabled = false,
  title,
  loading,
  size,
  rounded = false,
  gutterBottom,
  style = {},
  fullWidth = false,
  translucent = false,
  color = "primary",
  variant = "contained",
  start,
  end,
}) => {
  const colors = useColors();

  const styles = ScaledSheet.create({
    con: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-start",
      justifyContent: "center",
      backgroundColor:
        variant === "text" || variant === "outlined"
          ? null
          : translucent
          ? translucent === "dark"
            ? colors.white[3] + "2"
            : colors.black[3] + "2"
          : loading
          ? colors[color].light
          : disabled
          ? colors.white[4]
          : colors[color].main,
      borderRadius: rounded ? 30 : 10,
      elevation: variant === "text" ? 0 : elevation,
      paddingVertical: size === "small" ? 7 : "10@ms",
      paddingHorizontal: size === "small" ? "8@ms" : "18@ms",
      borderColor: colors[color].main,
      borderWidth: variant === "outlined" ? 1 : 0,
      shadowColor: "#000",
      shadowRadius: elevation,
      marginBottom: gutterBottom,
      shadowOffset: {
        height: elevation / 2,
        width: 0,
      },
      shadowOpacity: variant === "text" ? 0 : 0.3,
      width: fullWidth ? "100%" : null,
      ...style,
    },
    text: {
      color: disabled
        ? variant === "text" || variant === "outlined"
          ? colors.black[1]
          : colors[color].text
        : colors[color][
            variant === "text" || variant === "outlined" ? "main" : "text"
          ],
      fontWeight: variant === "outlined" ? "700" : "500",
      fontSize: size === "small" ? "12@ms" : "16@ms",
    },
  });

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={styles.con}>
      {start}
      {loading && (
        <ActivityIndicator
          size="small"
          color={colors[color].text}
          style={{ marginRight: 10 }}
        />
      )}
      <Text style={styles.text}>{title}</Text>
      {end}
    </TouchableOpacity>
  );
};

export default Button;
