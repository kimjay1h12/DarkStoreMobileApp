import React from "react";
import { View } from "react-native";
import Row from "./Row";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { Typography, useColors } from "../../src/Hoddy-ui";
function PasswordValidation({ passwordError }) {
  const colors = useColors();
  return (
    <View>
      <Row mb={5} justifyContent={"space-between"}>
        <Row gap={3}>
          <Ionicons
            name="checkmark-done-outline"
            size={22}
            color={
              passwordError?.specialCharacterError
                ? colors.success.main
                : "#aaa"
            }
          />
          <Typography
            style={{
              color: passwordError?.specialCharacterError
                ? colors.success.main
                : "#aaa",
            }}
          >
            Special Character
          </Typography>
        </Row>
        <Row gap={3}>
          <Ionicons
            name="checkmark-done-outline"
            size={22}
            color={passwordError?.uppercaseError ? colors.success.main : "#aaa"}
          />
          <Typography
            style={{
              color: passwordError?.uppercaseError
                ? colors.success.main
                : "#aaa",
            }}
          >
            Uppercase
          </Typography>
        </Row>
        <Row gap={3}>
          <Ionicons
            name="checkmark-done-outline"
            size={22}
            color={passwordError?.lowercaseError ? colors.success.main : "#aaa"}
          />
          <Typography
            style={{
              color: passwordError?.lowercaseError
                ? colors.success.main
                : "#aaa",
            }}
          >
            Lowercase
          </Typography>
        </Row>
      </Row>
      <Row gap={3} mb={5}>
        <Ionicons
          name="checkmark-done-outline"
          size={22}
          color={passwordError?.numberRegex ? colors.success.main : "#aaa"}
        />
        <Typography
          style={{
            color: passwordError?.numberRegex ? colors.success.main : "#aaa",
          }}
        >
          Number
        </Typography>
      </Row>
      <Row gap={3} mb={10}>
        <Ionicons
          name="checkmark-done-outline"
          size={22}
          color={passwordError?.lengthError ? colors.success.main : "#aaa"}
        />
        <Typography
          style={{
            color: passwordError?.lengthError ? colors.success.main : "#aaa",
          }}
        >
          Password length must be at least 6 characters
        </Typography>
      </Row>
    </View>
  );
}

export default PasswordValidation;
