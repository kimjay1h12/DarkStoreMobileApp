import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Button, Typography, useColors } from "../../src/Hoddy-ui";
import { ScaledSheet } from "react-native-size-matters";
import Row from "../custom/Row";

function OrderItem({
  onPress = () => {},
  header = true,
  date,
  orderNumber,
  price,
  status,
  qauntity,
  data,
  rider,
}) {
  const colors = useColors();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.root, { backgroundColor: colors.light.main }]}
    >
      {header ? (
        <Row justifyContent="space-between" align="flex-start">
          <View style={{ width: "80%" }}>
            <Typography variant="h6" fontWeight={700}>
              {date}
            </Typography>
            <Typography color="grey" variant="body2">
              Order No:{orderNumber}
            </Typography>
          </View>
          <View>
            <View
              style={{
                backgroundColor:
                  status === "accepted"
                    ? colors.info.main
                    : status === "rejected"
                    ? colors.error.main
                    : colors.primary.main,
                padding: 7,
                flex: 0,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
              }}
            >
              <Typography fontWeight={700} variant="caption" color="light">
                {status?.toUpperCase()}
              </Typography>
            </View>

            <Typography color="grey" variant="caption" align="center">
              {qauntity} items
            </Typography>
          </View>
        </Row>
      ) : (
        <Row justifyContent={"space-between"}>
          <Typography color="grey" variant="body2">
            Order No: {orderNumber}
          </Typography>
          <View
            style={{
              backgroundColor:
                status === "accepted"
                  ? colors.info.main
                  : status === "rejected"
                  ? colors.error.main
                  : colors.primary.main,
              padding: 7,
              flex: 0,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
            }}
          >
            <Typography variant="caption">{status}</Typography>
          </View>
        </Row>
      )}

      <Row justifyContent="space-between">
        <View style={styles.product}>
          {/* {data?.map((cur, i) => (
          
          ))} */}
          <Image source={{ uri: data?.image }} style={styles.productimage} />
        </View>
        <View
          style={{
            borderRadius: 5,
            borderColor: colors.dark.main,
            padding: 5,
            borderWidth: 1,
          }}
        >
          <Typography variant="caption" fontWeight={600}>
            {qauntity} items
          </Typography>
        </View>
      </Row>
      <Row justifyContent="space-between">
        <Typography variant="h6" fontWeight={700} color="grey">
          ₦ {price}
        </Typography>
        {header && (
          <Button
            disabled={status != "accepted" || rider === ""}
            title="Track Order"
            size="small"
            onPress={onPress}
            style={{ borderRadius: 5 }}
          />
        )}
      </Row>
    </TouchableOpacity>
  );
}
const styles = ScaledSheet.create({
  root: {
    padding: "15@s",
    borderRadius: 10,
    minHeight: "120@s",
    flex: 0,
    justifyContent: "space-between",
    flexDirection: "column",
    gap: 10,
    marginBottom: 20,
  },
  product: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  productimage: {
    height: "30@s",
    width: "30@s",
    borderRadius: 20,
    resizeMode: "contain",
  },
});
export default OrderItem;
