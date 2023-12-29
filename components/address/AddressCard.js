import React from "react";
import { View } from "react-native";
import { Button, Typography } from "../../src/Hoddy-ui";
import { ScaledSheet } from "react-native-size-matters";
import Row from "../custom/Row";
import RadioButton from "../custom/RadioButton";
import Divider from "../custom/Divider";

function AddressCard({
  type,
  label,
  description,
  number,
  divider = true,
  color,
  checked,
  onPress = () => {},
  showLabel = true,
}) {
  return (
    <View style={styles.root}>
      {showLabel && (
        <Button
          title={label}
          size="small"
          style={{
            backgroundColor: type === "home" ? "#CC5500" : "#1039001A",
            borderRadius: 5,
          }}
          gutterBottom={10}
        />
      )}

      <Row justifyContent="space-between" gap={10} mb={10}>
        <View style={{ width: "90%" }}>
          <Typography color={color ? "primary" : ""}>{description}</Typography>
          <Typography color={color ? "primary" : ""}>{number}</Typography>
        </View>
        <RadioButton checked={checked} onPress={onPress} />
      </Row>
      {divider && <Divider />}
    </View>
  );
}
const styles = ScaledSheet.create({
  root: {
    marginTop: 20,
  },
});
export default AddressCard;
